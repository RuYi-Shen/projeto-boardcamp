import { Router } from 'express';
import { getRentals, insertRentals, updateRentals, deleteRentals } from '../controllers/rentalsController.js';

import { checkRental } from '../middlewares/rentalsMiddleware.js'; 

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", checkRental, insertRentals);
rentalsRouter.post("/rentals/:id/return", updateRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
