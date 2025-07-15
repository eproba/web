export const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL !== undefined
    ? process.env.NEXT_PUBLIC_SERVER_URL + "/api"
    : "";

export const INTERNAL_API_URL =
  process.env.INTERNAL_SERVER_URL !== undefined
    ? process.env.INTERNAL_SERVER_URL + "/api"
    : API_URL;

export const API_VERSION = "0.6.0"; // API version that the client expects

if (API_URL === "") {
  throw new Error(
    "NEXT_PUBLIC_SERVER_URL was not set in enviroment variables!",
  );
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  response: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    response?: unknown,
  ) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}
