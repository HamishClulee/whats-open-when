import express from "express";
import { applicationUtil } from "./utils/applicationUtil.js";
import ApiRoutes from "./routes/apiRoutes.js";

class WhatsOpenWhen {
  app;
  port = 2999;

  constructor() {
    this.app = express();
  }

  init() {
    applicationUtil.settings(this.app, this.port);

    new ApiRoutes(this.app);

    this.app.listen(this.port, () =>
      console.log(`Server :: Running @ 'http://localhost:${this.port}'`)
    );
  }
}

new WhatsOpenWhen().init();
