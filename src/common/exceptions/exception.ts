import { HttpException } from '@nestjs/common'

export interface IExceptionRecord {
  statusCode: number
  module?: string
  type: 'application' | 'validation' | 'domain' | 'infrastructure'
  codes: string[]
}

export class Exception extends HttpException {
  constructor(exceptionRecord: IExceptionRecord) {
    super(exceptionRecord, exceptionRecord.statusCode)
  }
}
