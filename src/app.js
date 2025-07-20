import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import indexRouter from "./routes/indexRouter.js";
import dataRouter from "./routes/dataRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/data", dataRouter)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) );
