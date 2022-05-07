import express from "express";
import { Request, Response } from "express";
import { HttpException } from "./../exceptions/http-exceptions";
export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: express.NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({
    request,
    message,
    status,
    isSuccess: "fail",
  });
  next();
}
