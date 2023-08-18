import cors from "cors";
import express from "express";
import morgan from "morgan";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config";
// import { dbConnection } from "@databases";
// import { Routes } from "@interfaces/routes.interface";
// import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";
import { Routes } from "@interfaces/routes.interface";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 8000;

    // this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

//   private connectToDatabase() {
//     if (this.env !== "production") {
//       set("debug", true);
//     }

//     connect(dbConnection.url)
//       .then(() => console.log("DB connected"))
//       .catch((err) => console.log(err));
//   }

  private initializeMiddlewares() {
    // * morgan dev -> :method :url :status :response-time ms - :res[content-length]
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    // this.app.use(errorMiddleware);
  }
}

export default App;
