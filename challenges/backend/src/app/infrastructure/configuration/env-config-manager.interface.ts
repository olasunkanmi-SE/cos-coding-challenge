export interface IEnvironmentConfigurationManager {
  get(key: string, defaultValue?: string): string;
}
