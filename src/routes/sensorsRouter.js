import express from "express";
import { postSensors } from "../controller/sensorsController.js";

const sensorsRouter = express.Router();
sensorsRouter.use(express.urlencoded({ extended: true }));
sensorsRouter.post("/", postSensors);

export default sensorsRouter;
