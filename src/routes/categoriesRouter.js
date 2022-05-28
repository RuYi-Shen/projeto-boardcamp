import { Router } from 'express';
import { getCategories, insertCategory } from '../controllers/categoriesController.js';

import { checkCategory } from '../middlewares/categoriesMiddleware.js'; 

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", checkCategory, insertCategory);

export default categoriesRouter;