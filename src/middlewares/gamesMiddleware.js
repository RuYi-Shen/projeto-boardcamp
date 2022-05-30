import connection from "../db.js";

import { gameSchema } from "../schemas/gameSchema.js";

export async function checkGame(req, res, next) {
  const game = req.body;
  try {
    await gameSchema.validateAsync(game);
    const category = await connection.query(
      "SELECT * FROM categories WHERE id = $1",
      [game.categoryId]
    );
    if (!(category?.rows.length > 0)) {
      return res.status(400).send("Category does not exist");
    }
    const gameFromDB = await connection.query(
      "SELECT * FROM games WHERE name = $1",
      [game?.name]
    );
    if (gameFromDB?.rows.length > 0) {
      return res.status(409).send("Game already exists");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
