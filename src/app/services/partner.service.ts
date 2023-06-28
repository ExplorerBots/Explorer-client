import axios from 'axios';
import { links } from '../constants';

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

export const partnerService = {
   async getPartner() {
      const { data } = await instance.get('partners');
      return data;
   },
   async createLink(service: string, link: string, partnerId: number) {
      const { data } = await instance.post('partners/links', {
         service,
         link,
         partnerId,
      });
      return data;
   },
   async deleteLink(linkId: number) {
      const { data } = await instance.delete('partners/links', {
         data: { id: linkId },
      });
      return data;
   },
   async checkPromo(code: string) {
      const { data } = await instance.post('partners/promocodes/check', {
         code,
      });
      return data;
   },
};
