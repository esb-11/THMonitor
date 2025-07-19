import { Router } from "express";

const indexRouter = Router();
indexRouter.get("/", (req, res) => {
  res.end("Index");
});

export default indexRouter;
