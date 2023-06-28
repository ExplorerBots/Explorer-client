import axios from 'axios';
import { links } from '../constants';
import { IBuyBot, IExtendBot } from '../interfaces';

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
};
