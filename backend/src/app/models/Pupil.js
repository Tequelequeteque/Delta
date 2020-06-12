import Sequelize, { Model } from 'sequelize';

class Pupil extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'pupils',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Image, { foreignKey: 'pupil_id', as: 'image' });
    this.hasOne(models.Address, { foreignKey: 'pupil_id', as: 'address' });
    return this;
  }
}

export default Pupil;
