import express from "express";
import { postData } from "../controller/dataController.js";

const dataRouter = express.Router();
dataRouter.use(express.json());
dataRouter.post("/", postData);

export default dataRouter;
