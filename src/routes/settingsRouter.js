import express from "express";
import { getSettings } from "../controller/settingsController.js";

const settingsRouter = express.Router();
settingsRouter.get("/", getSettings);

export default settingsRouter;
