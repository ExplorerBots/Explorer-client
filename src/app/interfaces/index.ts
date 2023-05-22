export interface IFullUser {
   id: number;
   email: string;
   username: string;
   password: string;
   balance: number;
   role: string;
   createdAt: string;
   updatedAt: string;
}

export type RegistrationUserDto = {
   email: string;
   username: string;
   password: string;
};

export type AuthorizeUserDto = {
   email: string;
   password: string;
};

export type UpdateUserDto = {
   email: string;
};

export interface IUser {
   id: number;
   email: string;
   username: string;
   password: string;
   balance: number;
   role: string;
}

export interface ChangeUsernameDto {
   id: number;
   username: string;
}

export interface ChangeRoleDto {
   id: number;
   role: string;
}

export interface BalanceDifferenceDto {
   id: number;
   balanceDifference: number;
}

export interface IRegistrationFields {
   email: string;
   username: string;
   password: string;
}

export interface IAuthorizeFields {
   email: string;
   password: string;
}
