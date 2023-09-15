import { links } from '@/constants';
import { IBotMacrosBlock, IBuyBot, IExtendBot } from '@/interfaces';
import axios from 'axios';
import {
   AddToWhitelistDto,
   CreateMacrosDto,
   CreateTimerDto,
   UpdateTimerDto,
} from './types';

const instance = axios.create({
   baseURL: links.BACKEND,
   headers: {
      options: {
         'Content-Type': 'application/json',
      },
   },
});

instance.interceptors.request.use((config) => {
   const token = window.localStorage.getItem('authToken');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export const botsService = {
   async buyBot(dto: IBuyBot) {
      const { data } = await instance.post('bots/buy-bot', dto);
      window.localStorage.setItem('authToken', data.token);
      return data;
   },
   async myBots() {
      const { data } = await instance.get('bots/get-many');
      return data;
   },
   async extendBot(dto: IExtendBot) {
      const { data } = await instance.post('bots/extend', dto);
      window.localStorage.setItem('authToken', data.token);
      return data;
   },
   async getOne(botId: number) {
      const { data } = await instance.get(`bots/get-one/${botId}`);
      return data;
   },
   async changeUsername(botId: number, username: string) {
      const { data } = await instance.post(`bots/change-username`, {
         botId,
         username,
      });
      return data;
   },
   async addToWhitelist(dto: AddToWhitelistDto) {
      const { data } = await instance.post('bots/whitelist', dto);
      return data;
   },
   async removeToWhitelist(id: number) {
      const { data } = await instance.delete('bots/whitelist', {
         data: { id },
      });
      return data;
   },
   async createMacros(dto: CreateMacrosDto) {
      const { data } = await instance.post('bots/macroses', dto);
      return data;
   },
   async deleteMacros(id: number) {
      const { data } = await instance.delete('bots/macroses', { data: { id } });
      return data;
   },
   async getMacrosBlocks(macrosId: number) {
      const { data } = await instance.get(`bots/macroses/${macrosId}/blocks`);
      return data;
   },
   async updateMacros(blocks: IBotMacrosBlock[], macrosId: number) {
      const { data } = await instance.put(`bots/macroses/${macrosId}`, {
         data: { blocks: blocks },
      });
      return data;
   },
   async setActivatedMacros(botId: number, macrosId: number) {
      const { data } = await instance.post(
         `bots/set-active-macros/${macrosId}/${botId}`
      );
      return data;
   },
   async getTimers(botId: number) {
      const { data } = await instance.get(`bots/timers/${botId}`);
      return data;
   },
   async createTimer(dto: CreateTimerDto) {
      const { data } = await instance.post('bots/timers', dto);
      return data;
   },
   async removeTimer(id: number) {
      const { data } = await instance.delete(`bots/timers/${id}`);
      return data;
   },
   async updateTimer(id: number, dto: UpdateTimerDto) {
      const { data } = await instance.patch(`bots/timers/${id}`, dto);
      return data;
   },
};
