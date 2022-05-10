export interface IEnvironmental {
  getBaseURL(): string | undefined;
  getBuyerURL(): string | undefined;
  getAuthURL(): string | undefined;
}
