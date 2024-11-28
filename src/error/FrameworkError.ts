export class FrameworkError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = "FrameworkError";
  }
}
