import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';
import pupilController from './app/controllers/Pupil';

const upload = multer(configMulter);

const routes = new Router();

routes.post('/pupils', upload.single('image'), pupilController.store);
routes.put('/pupils', upload.single('image'), pupilController.update);
routes.get('/pupils', pupilController.index);
routes.get('/pupils/:id', pupilController.show);
routes.delete('/pupils/:id', pupilController.delete);

export default routes;
