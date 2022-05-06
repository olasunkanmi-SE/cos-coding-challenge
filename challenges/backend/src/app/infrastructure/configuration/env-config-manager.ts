import { IEnvironmentConfigurationManager } from "./env-config-manager.interface";

export class EnvironmentConfigurationManager implements IEnvironmentConfigurationManager {
  /**
   * Get config from environment variables
   *
   * @param {string} key The environment variable key
   * @returns {string}
   * @memberof EnvironmentConfigurationManager
   */
  get(key: string, defaultValue?: string): string {
    const configValue = process.env[key];
    return configValue || defaultValue || "";
  }
}
