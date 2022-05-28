import connection from "../db.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.json(categories?.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function insertCategory(req, res) {
  const category = req.body;
  try {
    const { name } = category;
    const result = await connection.query(
      "INSERT INTO categories (name) VALUES ($1)",
      [name]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
