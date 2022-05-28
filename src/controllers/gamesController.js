import connection from "../db.js";

export async function getGames(req, res) {
  try {
    const search = req.query.name;
    if (search) {
      const games = await connection.query(
        'SELECT games.*,categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE $1',
        [search + "%"]
      );
      res.status(200).send(games.rows);
    } else {
      const games = await connection.query(
        'SELECT games.*,categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;'
      );
      res.json(games.rows);
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
