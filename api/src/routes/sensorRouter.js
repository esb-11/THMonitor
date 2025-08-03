import express from "express";
import * as sensorController from "../controller/sensorController.js";

const sensorRouter = express.Router();

sensorRouter.post("/", sensorController.postSensor);
sensorRouter.get("/", sensorController.getSensors);
sensorRouter.get("/:sensor", sensorController.getSensor);
sensorRouter.put("/:sensor", sensorController.putSensor);
sensorRouter.delete("/:sensor", sensorController.deleteSensor);

export default sensorRouter;
