export type UserRegistrationDto = {
   email: string
   username: string
   password: string
}

export interface IFullUser {
   id: number
   email: string
   username: string
   password: string
   balance: number
   role: string
   createdAt: string
   updatedAt: string
}

export type UserLoginDto = {
   email: string
   password: string
}

export interface IUser {
   id: number
   email: string
   username: string
   balance: number
   role: string
}

export interface ChangeUsernameDto {
   id: number
   username: string
}

export interface ChangeRoleDto {
   id: number
   role: string
}

export interface BalanceDifferenceDto {
   id: number
   balanceDifference: number
}