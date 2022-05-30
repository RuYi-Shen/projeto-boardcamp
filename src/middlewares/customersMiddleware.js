import connection from "../db.js";

import { customerSchema } from "../schemas/customerSchema.js";

export async function checkCustomer(req, res, next) {
  const customer = req.body;
  try {
    await customerSchema.validateAsync(customer);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
