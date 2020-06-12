import * as Yup from 'yup';
import fs from 'fs';
import { resolve } from 'path';
import httpCode from 'http-status-codes';
import Pupil from '../models/Pupil';

class PupilController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      country: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(httpCode.BAD_REQUEST).json({ error: 'Bad Request' });

    const { name, country, state, city, street, number } = req.body;
    const { originalname: fileName, filename: path } = req.file || {
      originalname: null,
      filename: null,
    };
    const address = { country, state, city, street, number };
    const image = { fileName, path };

    const transaction = await Pupil.sequelize.transaction({
      autocommit: false,
    });
    let pupil;
    try {
      pupil = await Pupil.create(
        { name, address, image },
        {
          transaction,
          include: [
            { model: Pupil.sequelize.models.Image, as: 'image' },
            { model: Pupil.sequelize.models.Address, as: 'address' },
          ],
        }
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }

    return res.status(httpCode.CREATED).json(pupil);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      country: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(httpCode.BAD_REQUEST).json({ error: 'Bad Request' });

    const { id, name, country, state, city, street, number } = req.body;
    const { originalname: fileName, filename: path } = req.file || {
      originalname: null,
      filename: null,
    };

    let pupil = await Pupil.findByPk(id, {
      include: [
        { model: Pupil.sequelize.models.Image, as: 'image' },
        { model: Pupil.sequelize.models.Address, as: 'address' },
      ],
    });

    if (!pupil)
      return res
        .status(httpCode.NOT_FOUND)
        .json({ error: 'Pupil dont found.' });

    let filePath;
    if (pupil.image.path)
      filePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        pupil.image.path
      );

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    const address = { country, state, city, street, number };
    const image = {
      fileName,
      path,
    };

    const transaction = await Pupil.sequelize.transaction({
      autocommit: false,
    });
    try {
      await pupil.update({ name }, { transaction });
      await Pupil.sequelize.models.Address.update(address, {
        transaction,
        where: { pupil_id: id },
      });
      await Pupil.sequelize.models.Image.update(image, {
        transaction,
        where: { pupil_id: id },
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      pupil = await Pupil.findByPk(id, {
        include: [
          { model: Pupil.sequelize.models.Image, as: 'image' },
          { model: Pupil.sequelize.models.Address, as: 'address' },
        ],
      });
    }

    return res.json(pupil);
  }

  async index(_req, res) {
    const pupils = await Pupil.findAll({
      include: [
        { model: Pupil.sequelize.models.Image, as: 'image' },
        { model: Pupil.sequelize.models.Address, as: 'address' },
      ],
    });
    return res.json(pupils);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(httpCode.BAD_REQUEST).json({ error: 'Bad Request' });

    const { id } = req.params;
    const pupil = await Pupil.findByPk(id, {
      include: [
        { model: Pupil.sequelize.models.Image, as: 'image' },
        { model: Pupil.sequelize.models.Address, as: 'address' },
      ],
    });

    if (!pupil)
      return res
        .status(httpCode.NOT_FOUND)
        .json({ error: 'Pupil dont found.' });

    return res.json(pupil);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(httpCode.BAD_REQUEST).json({ error: 'Bad Request' });

    const { id } = req.params;
    const pupil = await Pupil.findByPk(id, {
      include: [{ model: Pupil.sequelize.models.Image, as: 'image' }],
    });

    const path = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      pupil.image.path
    );

    if (pupil) {
      pupil.destroy();
      if (fs.existsSync(path)) fs.unlinkSync(path);
    }

    return res.status(httpCode.NO_CONTENT).send();
  }
}
export default new PupilController();
