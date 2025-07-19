import "dotenv/config";
import express from "express";
import indexRouter from "./routes/indexRouter.js";
import dataRouter from "./routes/dataRouter.js";

const app = express();
app.use("/", indexRouter);
app.use("/data", dataRouter)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) );
