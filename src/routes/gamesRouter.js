import { Router } from 'express';
import { getGames, insertGame } from '../controllers/gamesController.js';

import { checkGame } from '../middlewares/gamesMiddleware.js'; 

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", checkGame, insertGame);

export default gamesRouter;