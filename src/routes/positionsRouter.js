import express from "express";
import { postPositions } from "../controller/positionsController.js";

const positionsRouter = express.Router();
positionsRouter.use(express.urlencoded({ extended: true }));
positionsRouter.post("/", postPositions);

export default positionsRouter;
