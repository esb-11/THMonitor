import { Router } from "express";
import cors from "cors";
import dataRouter from "./dataRouter.js";
import sensorRouter from "./sensorRouter.js";
import locationRouter from "./locationRouter.js";
import positionRouter from "./positionRouter.js";

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ORIGIN == origin) {
      callback(null, true);
    } else {
      console.log(`Access denied to ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const routes = Router();

routes.use("/data", cors(), dataRouter);
routes.use(cors(corsOptions));
routes.use("/sensors", sensorRouter);
routes.use("/locations", locationRouter);
routes.use("/positions", positionRouter);

export default routes;
