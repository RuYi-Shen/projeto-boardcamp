import connection from "../db.js";

export async function getCustomers(req, res) {
  try {
    const search = req.query.cpf;
    if (search) {
      const customers = await connection.query(
        "SELECT customers.* FROM customers WHERE customers.cpf ILIKE $1;",
        [search + "%"]
      );
      res.status(200).send(customers.rows);
    } else {
      const customers = await connection.query(
        "SELECT customers.* FROM customers;"
      );
      res.json(customers.rows);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function insertCustomer(req, res) {
  const customer = req.body;
  try {
    const { name, phone, cpf, birthday } = customer;
    const result = await connection.query(
      "INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
