import connection from "../db.js";

export async function getRentals(req, res) {
  try {
    const gameId = req.query.gameId;
    const customerId = req.query.customerId;
    let rentals = { rows: [] };

    if (gameId) {
      rentals = await connection.query(
        'SELECT rentals.* FROM rentals WHERE rentals."gameId" = $1',
        [gameId]
      );
    } else if (customerId) {
      rentals = await connection.query(
        'SELECT rentals.* FROM rentals WHERE rentals."customerId" = $1',
        [customerId]
      );
    } else {
      rentals = await connection.query("SELECT rentals.* FROM rentals");
    }

    for (let i = 0; i < rentals.rows.length; i++) {
      const auxCustomer = await connection.query(
        "SELECT customers.id,customers.name FROM customers WHERE customers.id = $1",
        [rentals.rows[i].customerId]
      );
      rentals.rows[i].customer = auxCustomer.rows[0];
      const auxGame = await connection.query(
        'SELECT games.id,games.name,games."categoryId",categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1',
        [rentals.rows[i].gameId]
      );
      rentals.rows[i].game = auxGame.rows[0];
    }

    res.send(rentals.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function insertRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const game = res.locals.game;
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = yyyy + "-" + mm + "-" + dd;

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice") VALUES ($1,$2,$3,$4,$5)',
      [
        customerId,
        gameId,
        today,
        daysRented,
        daysRented * parseFloat(game.pricePerDay),
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateCustomer(req, res) {
  const customer = req.body;
  try {
    const customerFromDB = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [customer.cpf]
    );
    if (customerFromDB?.rows.length == 0) {
      return res.status(404).send("Customer not found");
    }
    await connection.query("DELETE FROM customers WHERE cpf = $1", [
      customer.cpf,
    ]);

    const { name, phone, cpf, birthday } = customer;
    const result = await connection.query(
      "INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateRentals(req, res) {}

export async function deleteRentals(req, res) {}
