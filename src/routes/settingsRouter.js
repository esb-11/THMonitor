import { Router } from "express";

const settingsRouter = Router();
settingsRouter.get("/", (req, res) => {
  res.end("settings");
})

export default settingsRouter;
