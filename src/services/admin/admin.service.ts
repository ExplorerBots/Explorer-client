import { links } from '@/constants';
import {
   BalanceDifferenceDto,
   ChangeUsernameDto,
   CreateLinkDto,
   CreatePartnerDto,
   CreatePromocodeDto,
   DeleteLinkDto,
   DeletePartnerDto,
   DeletePromocodeDto,
   GetUsersDto,
   IChangeBot,
   IFullUser,
} from '@/interfaces';
import axios from 'axios';

export const instance = axios.create({
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

export const adminService = {
   async giveBalance(dto: BalanceDifferenceDto) {
      return instance.patch('/admins/give-balance', dto);
   },
   async takeBalance(dto: BalanceDifferenceDto) {
      return instance.patch('/admins/take-balance', dto);
   },
   async changeUsername(dto: ChangeUsernameDto) {
      return instance.patch('/admins/change-username', dto);
   },
   async getUsers(dto: GetUsersDto) {
      const { data } = await instance.get<IFullUser[]>(`/admins/get-users`, {
         params: dto,
      });

      return data;
   },
   async getUserById(id: number) {
      const { data } = await instance.get(`/admins/get-users/${id}`);
      return data;
   },
   async changeBot(dto: IChangeBot) {
      const { data } = await instance.patch('/admins/change-bot', dto);
      return data;
   },
   async createPartner(dto: CreatePartnerDto) {
      const { data } = await instance.post('/partners', dto);
      return data;
   },
   async deletePartner(dto: DeletePartnerDto) {
      const { data } = await instance.delete('/partners', { data: dto });
      return data;
   },
   async createPromocode(dto: CreatePromocodeDto) {
      const { data } = await instance.post('/partners/promocodes', dto);
      return data;
   },
   async deletePromocode(dto: DeletePromocodeDto) {
      const { data } = await instance.delete('/partners/promocodes', {
         data: dto,
      });
      return data;
   },
   async createLink(dto: CreateLinkDto) {
      const { data } = await instance.post('/partners/links', dto);
      return data;
   },
   async deleteLink(dto: DeleteLinkDto[]) {
      const { data } = await instance.delete('/partners/links', { data: dto });
      return data;
   },
};
