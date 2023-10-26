// routes/api-routes.ts
import express, { Router } from 'express';
import { ApiController } from '../controllers/api-controllers';

const apiController = new ApiController;

export class ApiRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/getFee', apiController.getFee);
    this.router.post('/getPatient', apiController.getPatient);
  }
}