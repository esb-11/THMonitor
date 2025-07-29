import express from "express";
import { postPositions, deletePositions } from "../controller/positionsController.js";

const positionsRouter = express.Router();
positionsRouter.use(express.urlencoded({ extended: true }));
positionsRouter.post("/", postPositions);
positionsRouter.post("/delete", deletePositions);

export default positionsRouter;
