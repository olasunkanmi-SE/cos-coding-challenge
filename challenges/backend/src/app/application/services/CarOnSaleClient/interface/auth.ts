export interface IAuth {
  token: string;
  authenticated: boolean;
  userIs: string;
  internalUserId: number;
  internalUserUUId: string;
  type: number;
  privileges: string;
}

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
  authenticateUser(data: { userId: string; password: string }): any;
}
