import { AxiosError } from "axios";

interface IError {
  status: 400 | 401 | 500;
  message: string;
}

export type TypeError = AxiosError<IError>;
