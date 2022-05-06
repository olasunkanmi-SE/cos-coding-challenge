/**
 * Error metadata for logging. Can accept any metadata that needs to be logged in relation to the error.
 * Actual exception information thrown by upstream functions.
 * @export
 * @interface IErrorMetadata
 */
export interface IErrorMetadata {
  exception?: any;
  [key: string]: any;
}
