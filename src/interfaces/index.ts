export interface IFullUser {
   id: number;
   email: string;
   username: string;
   password: string;
   balance: number;
   role: 'ADMIN' | 'USER' | 'PARTNER';
   bots: IBot[];
   payments: IPayment[];
   partner: IPartner | null;
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
   whitelist: IBotWhitelistUser[];
   macroses: IBotMacros[];
   timers: IBotTimer[];
   activeMacrosId: number;
}

export interface IBotWhitelistUser {
   id: number;
   botId: number;
   username: number;
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
   period: number;
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

export interface IPayment {
   id: number;
   userId: number;
   amount: number;
   type: string;
   date: string;
   createdAt: string;
}

export interface GetUsersDto {
   username?: string;
   email?: string;
   limit: number;
}

export interface IChangeBot {
   id: number;
   username?: string;
   type?: string;
   server?: string;
   termType: string;
   termDays: number;
}

export interface CreatePartnerDto {
   userId: number;
}

export interface DeletePartnerDto {
   userId: number;
}

export interface CreatePromocodeDto {
   partnerId: number;
   type: string;
   value: number;
   code: string;
}

export interface DeletePromocodeDto {}

export interface CreateLinkDto {
   partnerId: number;
   link: string;
   service: string;
}

export interface DeleteLinkDto {
   id: number;
}

export interface IProxy {
   host: string;
   hostId: number;
   id: number;
   password: string;
   port: number;
   userId: number;
   username: string;
   createDate: string;
   endDate: string;
}

export interface BuyProxyDto {
   period: number;
   country: string;
}

export interface IMacrosAction {
   actionType: string;
   text: string;
}

export interface IActiveMacrosAction {
   actionType: string;
   value: string | number;
   secondValue: string | number | undefined;
}

export interface IBotMacros {
   id: number;
   botId: number;
   title: string;
   blocks: IBotMacrosBlock[];
}

export interface IBotMacrosBlock {
   id: number;
   macrosId: number;
   blockType: string;
   event?: string;
   action?: string;
   value: string;
   secondValue?: string;
}
export interface IBotMacrosConstructorBlock {
   blockType: string;
   event?: string;
   action?: string;
   value: string;
   secondValue?: string;
   title: string;
}

export interface IBotTimer {
   botId: number;
   id: number;
   message: string;
   interval: number;
   createdAt: string;
}
