export class HttpException extends Error {
  public status: number;
  public message: string;
  public response: { status: number };
  public constructor(status: number, message: string, response: { status: number }) {
    super(message);
    this.message = message;
    this.status = status;
    this.response = response;
  }
}
