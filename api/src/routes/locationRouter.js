import express from "express";
import * as locationController from "../controller/locationController.js";

const locationRouter = express.Router();

locationRouter.post("/", locationController.postLocation);
locationRouter.get("/", locationController.getLocations);
locationRouter.get("/:location", locationController.getLocation);
locationRouter.put("/:location", locationController.putLocation);
locationRouter.delete("/:location", locationController.deleteLocation);

export default locationRouter;
