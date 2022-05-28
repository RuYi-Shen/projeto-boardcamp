import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

/* import { validateSignUp, validateSignIn, validateLogOut, verifyUser, validateUser, verifyInfo } from '../middlewares/authMiddleware.js';
import { validateToken } from '../middlewares/historyMiddleware.js'; */

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;