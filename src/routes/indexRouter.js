import { Router } from "express";
import { getIndex } from "../controller/indexController.js";

const indexRouter = Router();
indexRouter.get("/", getIndex);
export default indexRouter;
