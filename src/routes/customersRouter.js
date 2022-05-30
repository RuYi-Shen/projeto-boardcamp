import { Router } from 'express';
import { getCustomers, insertCustomer, updateCustomer } from '../controllers/customersController.js';

import { checkCustomer } from '../middlewares/customersMiddleware.js'; 

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.post("/customers", checkCustomer, insertCustomer);
customersRouter.put("/customers", checkCustomer, updateCustomer);

export default customersRouter;