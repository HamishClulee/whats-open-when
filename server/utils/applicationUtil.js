import express from "express";
import compression from "compression";
import history from "connect-history-api-fallback";
import cors from "cors";

class ApplicationUtil {
  settings(app, port) {
    app.set("port", port);
    app.use(compression());
    app.use(express.json());

    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use((req, res, next) => {
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Content-Type"
      );
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");

      next();
    });

    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );

    app.use(
      history({
        verbose: true,
        disableDotRule: true,
      })
    );
  }
}

export const applicationUtil = new ApplicationUtil();
