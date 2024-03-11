import { IUser } from "../../users/i-user"
import { IAuthUser } from "../i-auth-user"

export interface IAuthRequest {
    authUser: IAuthUser
    usuario: IUser
}
