import connection from "../db.js";

import { customerSchema } from "../schemas/customerSchema.js";

export async function checkCustomer(req, res, next) {
  const customer = req.body;
  try {
    await customerSchema.validateAsync(customer);
    
    const customerFromDB = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [customer.cpf]
    );
    if (customerFromDB?.rows.length > 0) {
      return res.status(409).send("Customer already exists");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
