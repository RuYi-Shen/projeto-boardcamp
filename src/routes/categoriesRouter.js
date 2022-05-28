import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoriesController.js';

import { checkCategory } from '../middlewares/categoriesMiddleware.js'; 

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", checkCategory, createCategory);

export default categoriesRouter;