import { IAuth } from "./iauth";
import { IResponse } from "./iresponse";

export type IRequest = (data : any, auth : IAuth) => Promise<IResponse>;