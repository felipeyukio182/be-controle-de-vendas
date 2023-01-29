import pino from "pino";

class Logger {
  private static _instance: Logger;
  public logger;

  private constructor() {
    this.logger = pino();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

const infoController = (url: string, method: string) => {
  Logger.Instance.logger.info(`${url} (${method})`);
};
const errorController = (
  url: string,
  method: string,
  errorMsg = "Erro inesperado."
) => {
  Logger.Instance.logger.error(`${url} (${method}) ERROR: ${errorMsg}`);
};

export const logger = {
  infoController,
  errorController,
};
