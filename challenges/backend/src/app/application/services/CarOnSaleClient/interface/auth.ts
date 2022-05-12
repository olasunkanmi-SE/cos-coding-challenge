import { IContextData } from "./../../../../infrastructure/context/context-manager.interface";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../../../dtos/auth.dto";

export interface IAuthError {
  msgKey: string;
  params: { userId: string };
  message: string;
}

export interface IRestAPIResponse<T> {
  data: T;
  status: number;
  statusText: string;
  errorCode?: any;
}

export interface IBuyerAuth {
  authenticateUser(data: { userId: string; password: string }, context: IContextData): Promise<AxiosResponse<IAuthResponse, any>>;
}
