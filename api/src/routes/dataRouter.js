import express from "express";
import * as dataController from "../controller/dataController.js";

const dataRouter = express.Router();

dataRouter.post("/", dataController.postData);

export default dataRouter;
