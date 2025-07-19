import express from "express";
import db from "../db.js";

const dataRouter = express.Router();
dataRouter.use(express.json());
dataRouter.post("/", (req, res) => {
  db.add(req.body);
  res.end();  
});

export default dataRouter;
