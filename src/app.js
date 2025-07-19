import "dotenv/config";
import express from "express";
import indexRouter from "./routes/indexRouter.js";

const app = express();
app.use("/", indexRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) );
