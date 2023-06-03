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

export interface ICreateBotFields {
   username: string;
}

export interface IBot {
   id: number;
   isPremium: boolean;
   username: string;
   server: string;
   status: 'online' | 'offline';
   endDate: number;
}

export interface IOperation {
   amount: number;
   type: string;
   date: number;
}

export interface IMessage {
   type: 'message';
   timestamp: string;
   text: string;
}

export interface IChatNotify {
   type: 'notify';
   temperature: string;
   title: string;
   description: string;
   timestamp: string;
}

export interface IGetMyBotsDto {}

export interface IBuyBot {
   isPremium: boolean;
   username: string;
   server: string;
   days: number;
}
