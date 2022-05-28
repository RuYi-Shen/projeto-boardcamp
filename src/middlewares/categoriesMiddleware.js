import connection from "../db.js";

import { categorySchema } from "../schemas/categorySchema.js";

export async function checkCategory(req, res, next) {
  const category = req.body;
  try {
    await categorySchema.validateAsync(category);
    const categoryFromDB = await connection.query(
      "SELECT * FROM categories WHERE name = $1",
      [category?.name]
    );
    if (categoryFromDB?.rows.length > 0) {
      return res.status(409).send("Category already exists");
    }
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}
