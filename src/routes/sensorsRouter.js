import express from "express";
import { postSensors, deleteSensors } from "../controller/sensorsController.js";

const sensorsRouter = express.Router();
sensorsRouter.use(express.urlencoded({ extended: true }));
sensorsRouter.post("/", postSensors);
sensorsRouter.post("/delete", deleteSensors);

export default sensorsRouter;
