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

export async function getCustomer(req, res) {
  try {
    const id = req.params.id;
    const customer = await connection.query(
      "SELECT customers.* FROM customers WHERE customers.id = $1;",
      [id]
    );
    if (customer.rows.length == 0) {
      return res.status(404).send("Customer not found");
    }
    res.json(customer.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function insertCustomer(req, res) {
  const customer = req.body;
  try {
    const customerFromDB = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [customer.cpf]
    );
    if (customerFromDB?.rows.length > 0) {
      return res.status(409).send("Customer already exists");
    }

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

export async function updateCustomer(req, res) {
  const customer = req.body;
  const id = req.params.id;
  try {
    const customerFromDB = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );
    if (customerFromDB?.rows.length == 0) {
      return res.status(404).send("Customer not found");
    }

    const { name, phone, cpf, birthday } = customer;
    const result = await connection.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
