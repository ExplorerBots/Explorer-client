import { links } from '@/constants';
import { BuyProxyDto } from '@/interfaces';
import axios from 'axios';

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

export const proxyService = {
   async getProxies() {
      const { data } = await instance.get('/proxy');
      return data;
   },
   async buyProxy(dto: BuyProxyDto) {
      const { data } = await instance.post('/proxy/buy', dto);
      return data;
   },
};
