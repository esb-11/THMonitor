import express from "express";
import * as positionController from "../controller/positionController.js";

const positionRouter = express.Router();

positionRouter.post("/", positionController.postPosition);
positionRouter.get("/", positionController.getPositions);
positionRouter.get("/:position", positionController.getPosition);
positionRouter.put("/:position", positionController.putPosition);
positionRouter.delete("/:position", positionController.deletePosition);

export default positionRouter;
