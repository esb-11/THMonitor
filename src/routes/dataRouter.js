import express from "express";
import { dataPost } from "../controller/dataController.js";

const dataRouter = express.Router();
dataRouter.use(express.json());
dataRouter.post("/", dataPost);

export default dataRouter;
