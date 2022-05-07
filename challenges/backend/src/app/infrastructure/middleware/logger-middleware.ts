import express from "express";
import { Request, Response } from "express";
import { DependencyIdentifier } from "../../application/constants/DependencyIdentifiers";
import { container } from "../ioc/ioc-container";
import { ILogger } from "../Logger/interface/ILogger";
export function loggerMiddleware(req: Request, res: Response, next: express.NextFunction) {
  const started = Date.now();
  const logger: ILogger = container.get<ILogger>(DependencyIdentifier.Logger);
  res.on("finish", () => {
    const duration = Date.now() - started;
    logger.trackRequest({
      name: `HTTP`,
      url: `HTTP ${req.method} ${req.url}`,
      duration,
      resultCode: res.statusCode,
      success: true,
    });
  });

  res.on("close", () => {
    const duration = Date.now() - started;
    logger.trackRequest({
      name: `HTTP`,
      url: `HTTP ${req.method} ${req.url}`,
      duration,
      resultCode: res.statusCode,
      success: true,
    });
  });
  next();
}
