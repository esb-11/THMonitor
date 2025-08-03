import { Router } from "express";
import dataRouter from "./dataRouter.js";
import sensorRouter from "./sensorRouter.js";
import locationRouter from "./locationRouter.js";
import positionRouter from "./positionRouter.js";

const routes = Router();

routes.use("/data", dataRouter);
routes.use("/sensors", sensorRouter);
routes.use("/locations", locationRouter);
routes.use("/positions", positionRouter);

export default routes;
