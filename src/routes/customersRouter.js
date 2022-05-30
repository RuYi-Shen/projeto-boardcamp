import { Router } from 'express';
import { getCustomers, } from '../controllers/customersController.js';

import { checkGame } from '../middlewares/gamesMiddleware.js'; 

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
//customersRouter.post("/customers", checkGame, insertGame);

export default customersRouter;