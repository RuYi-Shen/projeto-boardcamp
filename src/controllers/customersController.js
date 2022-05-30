import connection from "../db.js";

export async function getCustomers(req, res) {
  try {
    const search = req.query.cpf;
    if (search) {
      const customers = await connection.query(
        'SELECT customers.* FROM customers WHERE customers.cpf ILIKE $1;',
        [search + "%"]
      );
      res.status(200).send(customers.rows);
    } else {
      const customers = await connection.query(
        'SELECT customers.* FROM customers;'
      );
      res.json(customers.rows);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function insertGame(req, res) {
  const game = req.body;
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = game;
    const result = await connection.query(
      'INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
