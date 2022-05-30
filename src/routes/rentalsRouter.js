import { Router } from 'express';
import { getRentals, insertRentals, updateRentals, deleteRentals } from '../controllers/rentalsController.js';

import { checkRental } from '../middlewares/rentalsMiddleware.js'; 

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", checkRental, insertRentals);
rentalsRouter.put("/rentals", checkRental, updateRentals);
rentalsRouter.delete("/rentals", checkRental, deleteRentals);

export default rentalsRouter;
