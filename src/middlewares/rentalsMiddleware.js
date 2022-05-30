import connection from "../db.js";

import { rentalSchema } from "../schemas/rentalSchema.js";

export async function checkRental(req, res, next) {
  const rental = req.body;
  try {
    await rentalSchema.validateAsync(rental);
    const game = await connection.query("SELECT * FROM games WHERE id = $1", [
      rental.gameId,
    ]);
    if (game.rows.length == 0) {
      return res.status(400).send("Game not found");
    }
    res.locals.game = game.rows[0];
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [rental.customerId]
    );
    if (customer.rows.length == 0) {
      return res.status(400).send("Customer not found");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
