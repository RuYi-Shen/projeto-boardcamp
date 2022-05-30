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
  let today = getDate();

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


export async function updateRentals(req, res) {
  const id = req.params.id;
  try {
    const rental = await connection.query(
      'SELECT * FROM rentals WHERE rentals."id" = $1',
      [id]
    );
    if (rental.rows.length == 0) {
      return res.status(404).send("Rental not found");
    }
    if (rental.rows[0].returnDate != null) {
      return res.status(400).send("Game already returned");
    }
    const game = await connection.query("SELECT * FROM games WHERE id = $1", [
      rental.rows[0].gameId,
    ]);
    let date1 = new Date(rental.rows[0].rentDate);
    let date2 = new Date(getDate());
    let daysRented = Math.ceil((date2 - date1) / (1000 * 3600 * 24));
    
    let delayFee = (daysRented - rental.rows[0].daysRented) * parseInt(game.rows[0].pricePerDay);
    if (delayFee < 0) {
        delayFee = 0;
    }
    await connection.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE rentals."id" = $3',
      [getDate(), delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;
  try {
    const rental = await connection.query(
      "SELECT * FROM rentals WHERE id = $1",
      [id]
    );
    if (rental.rows.length == 0) {
      return res.status(404).send("Rental not found");
    }
    if (rental.rows[0].returnDate != null) {
      return res.status(400).send("Game already returned");
    }

    await connection.query("DELETE FROM rentals WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

function getDate() {
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
