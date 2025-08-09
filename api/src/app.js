import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ORIGIN == origin) {
      callback(null, true);
    } else {
      console.log(`Acces denied to ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`) );

console.log(`Only requests from ${process.env.ORIGIN} will be accepted`);
