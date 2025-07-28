import express from "express";
import { postLocations, deleteLocations } from "../controller/locationsController.js";

const locationsRouter = express.Router();
locationsRouter.use(express.urlencoded({ extended: true }));
locationsRouter.post("/", postLocations);
locationsRouter.post("/delete", deleteLocations);

export default locationsRouter;
