import express, { json } from "express";
import cors from "cors";

import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(json());

app.use(gamesRouter);
app.use(rentalsRouter);
app.use(customersRouter);
app.use(categoriesRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})
