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
   temperature: 'success' | 'error' | 'warning';
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

export interface IControlSideBarItem {
   divider?: boolean;
   id: number;
   src: string;
   text: string;
}

export interface IItem {
   type: number;
   count: number;
   metadata: number;
   nbt: any;
   name: string;
   displayName: string;
   stackSize: number;
   slot: number;
}

export interface IBotInfo {
   health: number;
   food: number;
   experience: number;
}

export interface ICurrentWindow {
   slots: IItem[];
   title: string;
   type: string;
   selectedItem: IItem;
   craftingResultSlot: number;
   hotbarStart: number;
   id: number;
   inventoryEnd: number;
   inventoryStart: number;
   requiresConfirmation: boolean;
   events: any;
}
