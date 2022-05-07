import express from "express";
import { Request, Response } from "express";
import { Context } from "../context/context";
/* tslint:disable:no-string-literal */
// @ts-ignore
export function contextMiddleWare(req: Request, res: Response, next: express.NextFunction) {
  new Context(new Date(), (req.headers["userid"] as string) || "", `HTTP ${req.method} ${req.url}`, (req.headers["authtoken"] as string) || "", {});
  next();
}
