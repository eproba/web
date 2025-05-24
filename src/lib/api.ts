export const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL !== undefined
    ? process.env.NEXT_PUBLIC_SERVER_URL + "/api"
    : "";

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
