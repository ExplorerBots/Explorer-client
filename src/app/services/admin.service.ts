import axios from 'axios';
import { links } from '../constants';
import {
   BalanceDifferenceDto,
   ChangeRoleDto,
   ChangeUsernameDto,
   GetUsersDto,
   IChangeBot,
   IFullUser,
} from '../interfaces';

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
   async changeRole(dto: ChangeRoleDto) {
      return instance.patch('/admins/change-role', dto);
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
};
