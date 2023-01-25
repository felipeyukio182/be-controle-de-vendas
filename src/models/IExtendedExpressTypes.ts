/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { IUser } from "./IUser";

export interface Request extends ExpressRequest {
  user: IUser;
}

export interface Response extends ExpressResponse {}
