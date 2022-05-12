import express from "express";
import { Request, Response } from "express";
import { HttpException } from "./../exceptions/http-exceptions";
// @ts-ignore
export function errorMiddleware(error: HttpException, request: Request, response: Response, next: express.NextFunction) {
  const status = error.status;
  let message = error.message || "Something went wrong";
  const axiosStatusResponse = error.response.status;
  if (axiosStatusResponse === 401) {
    message = "Invalid usermailId or password";
  }
  return response.status(status || axiosStatusResponse).json({
    message,
    status: status || axiosStatusResponse,
  });
  next();
}
