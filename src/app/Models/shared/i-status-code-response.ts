import { IApiCodes } from "./i-api-codes"

export interface IStatusCodeResponse<T> {
    statusCode: IApiCodes
    message?: string
    objects?: T[]
}
