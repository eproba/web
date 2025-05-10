export const API_URL =
  process.env.NEXT_PUBLIC_SERVER_URL !== undefined
    ? process.env.NEXT_PUBLIC_SERVER_URL + "/api"
    : "";

if (API_URL === "") {
  throw new Error("NEXT_PUBLIC_API_URL was not set in enviroment variables!");
}

export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}
