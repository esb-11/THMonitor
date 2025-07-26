import express from "express";
import { postLocations } from "../controller/locationsController.js";

const locationsRouter = express.Router();
locationsRouter.use(express.urlencoded({ extended: true }));
locationsRouter.post("/", postLocations);

export default locationsRouter;
