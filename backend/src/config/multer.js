import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      try {
        return cb(null, v4() + extname(file.originalname));
      } catch (error) {
        return cb(error);
      }
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg',
    ];

    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type.'));
  },
};
