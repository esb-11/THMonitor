import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import indexRouter from "./routes/indexRouter.js";
import dataRouter from "./routes/dataRouter.js";
import settingsRouter from "./routes/settingsRouter.js";
import locationsRouter from "./routes/locationsRouter.js";
import positionsRouter from "./routes/positionsRouter.js";
import sensorsRouter from "./routes/sensorsRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = join(__dirname, "public");

const app = express();
app.use(express.static(assetsPath));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/data", dataRouter);
app.use("/settings", settingsRouter);
app.use("/locations", locationsRouter);
app.use("/positions", positionsRouter);
app.use("/sensors", sensorsRouter);


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) );
