import { Router } from 'express';
import { getGames, insertGame } from '../controllers/gamesController.js';

import { checkGame } from '../middlewares/gamesMiddleware.js'; 

const categoriesRouter = Router();

categoriesRouter.get("/games", getGames);
categoriesRouter.post("/games", checkGame, insertGame);

export default categoriesRouter;