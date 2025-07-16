import express from "express";
import routes from "./routes/index.js";
import errorMiddleware from "./shared/middlewares/error.middleware.js";
import path from "path";
import bodyParser from "body-parser";
import { requestsLogger } from "./shared/middlewares/RequestLogger.util.js";

const app = express();

app.use(requestsLogger);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(bodyParser.urlencoded());

app.use(express.json());

app.use(express.urlencoded());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
