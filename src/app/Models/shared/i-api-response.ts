import { IApiCodes } from "./i-api-codes"

export interface IApiResponse<T> {
    statusCode: IApiCodes
    message?: string
    objects?: T[]
    token?: string
}
