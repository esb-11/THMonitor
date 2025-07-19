import { Router } from "express";
import indexController from "../controller/indexController.js";

const indexRouter = Router();
indexRouter.get("/", indexController.indexGet);
export default indexRouter;
