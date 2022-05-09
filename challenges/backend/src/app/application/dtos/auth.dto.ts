export interface IUserAuthDTO {
  password: string;
  userMailId: string;
}

export interface IAuthResponse {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUId: string;
  type: number;
  privileges: string;
}

export interface IAxiosResponse {
  config: any;
  data: IAuthResponse;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}
