import express from "express";

const dataRouter = express.Router();
dataRouter.use(express.json());
dataRouter.post("/", (req, res) => {
  console.log(req.body);
  res.end();  
});

export default dataRouter;
