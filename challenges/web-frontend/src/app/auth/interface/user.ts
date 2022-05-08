export interface IUserInfo {
  token: string | undefined;
  userId: string | undefined;
}

export interface IUserResponseDTO extends IUserInfo {
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: number;
  priviledges: string;
}
