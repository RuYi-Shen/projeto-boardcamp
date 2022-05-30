import { Router } from 'express';
import { getCustomers, insertCustomer } from '../controllers/customersController.js';

import { checkCustomer } from '../middlewares/customersMiddleware.js'; 

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.post("/customers", checkCustomer, insertCustomer);

export default customersRouter;