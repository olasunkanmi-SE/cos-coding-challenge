import express from "express";
import { Request, Response } from "express";
import { HttpException } from "./../exceptions/http-exceptions";
// @ts-ignore
export function errorMiddleware(error: HttpException, request: Request, response: Response, next: express.NextFunction) {
  const status = error.status;
  const message = error.message || "Something went wrong";
  const axiosRespponse = error.response.status;
  return response.status(status || axiosRespponse).json({
    message,
    status,
  });
  next();
}
