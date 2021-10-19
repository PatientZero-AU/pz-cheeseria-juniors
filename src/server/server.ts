import express = require("express");
import apiRouter from "./routes";
import mongoose =require("mongoose");
import morgan = require("morgan");
require("dotenv").config();
const app = express();

// db
mongoose
	.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/pzcheese`)
	.then(() => console.log(`**DB CONNECTED to ${process.env.DATABASE_PORT}**`))
	.catch((err) => console.log("DB CONNECTION ERR => ", err));

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
