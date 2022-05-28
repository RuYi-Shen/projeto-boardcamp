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
