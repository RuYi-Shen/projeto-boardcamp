import { Router } from "express";
import {
  getCustomer,
  getCustomers,
  insertCustomer,
  updateCustomer,
} from "../controllers/customersController.js";

import { checkCustomer } from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", checkCustomer, insertCustomer);
customersRouter.put("/customers/:id", checkCustomer, updateCustomer);

export default customersRouter;
