export interface AddToWhitelistDto {
   botId: number;
   username: string;
}

export interface removeToWhitelistDto {
   id: number;
}

export interface CreateMacrosDto {
   botId: number;
}

export interface CreateTimerDto {
   botId: number;
   message: string;
   interval: number;
}

export interface UpdateTimerDto {
   message?: string;
   interval?: number;
}
