import * as ip from 'ip';
import * as os from 'os';
import { IExceptionRecord } from './exception';

export interface IExceptionResponse extends IExceptionRecord {
  actionType: 'command' | 'query';
  path: string;
  requestId: string;
  method: string
  userId?: string;
}

export class ExceptionResponse {
  constructor({ module, type, actionType, path, codes = [], requestId, method, userId, statusCode }: IExceptionResponse) {
    this.statusCode = statusCode
    this.method = method
    this.requestId = requestId;
    this.ip = ip.address();
    this.host = os.hostname();
    this.system = 'WMS Back-End';
    this.module = module;
    this.type = type;
    this.actionType = actionType;
    this.path = path;
    this.codes = codes;
    this.userId = userId;
    this.timestamp = new Date();
  }

  requestId: string;
  ip: string;
  host: string;
  system: string;
  module: IExceptionResponse['module'];
  type: IExceptionResponse['type'];
  actionType: IExceptionResponse['actionType'];
  path?: IExceptionResponse['path'];
  codes: IExceptionResponse['codes'];
  userId?: IExceptionResponse['userId'];
  timestamp: Date;
  method: string
  statusCode: number
}
