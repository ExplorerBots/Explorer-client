export interface IFullUser {
   id: number;
   email: string;
   username: string;
   password: string;
   balance: number;
   role: 'ADMIN' | 'USER' | 'PARTNER';
   bots: IBot;
   // payments
   partner: IPartner;
   promocodeActivations: IPromocodeActivation[];
   createdAt: string;
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
   status: 'online' | 'offline' | 'expired';
   endDate: number;
}

export interface IOperation {
   amount: number;
   type: string;
   date: number;
}

export interface IMessage {
   type: 'message';
   extra: {
      bold: boolean;
      italic: boolean;
      underlined: boolean;
      strikethrough: boolean;
      obfuscated: boolean;
      color: string;
      text: string;
   }[];
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
   promocode?: IPartnerPromocode;
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

export interface IExtendBot {
   readonly botId: number;
   readonly extensionPeriod: number;
}

export interface IPartner {
   id: number;
   userId: number;
   income: number;
   activations: number;
   createdAt: string;
   links: IPartnerLink[];
   promocodes: IPartnerPromocode[];
}

export interface IPromocodeActivation {
   id: number;
   promocodeId: number;
   userId: number;
   createdAt: string;
}

export interface IPartnerPromocode {
   id: number;
   partnerId: number;
   type: 'discount' | 'days';
   value: number;
   code: string;
   createdAt: string;
   activations: IPromocodeActivation[];
}

export interface IPartnerLink {
   id: number;
   partnerId: number;
   link: string;
   service: string;
}

export interface GetUsersDto {
   username?: string;
   email?: string;
   limit: number;
}
