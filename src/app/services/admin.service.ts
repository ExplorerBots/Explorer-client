import axios from 'axios';
import { links } from '../constants';
import {
   BalanceDifferenceDto,
   ChangeRoleDto,
   ChangeUsernameDto,
   GetUsersDto,
} from '../interfaces';

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

export const adminService = {
   async giveBalance(dto: BalanceDifferenceDto) {
      return instance.put('/admins/give-balance', dto);
   },
   async takeBalance(dto: BalanceDifferenceDto) {
      return instance.put('/admins/take-balance', dto);
   },
   async changeRole(dto: ChangeRoleDto) {
      return instance.put('/admins/change-role', dto);
   },
   async changeUsername(dto: ChangeUsernameDto) {
      return instance.put('/admins/change-username', dto);
   },
   async getUsers(dto: GetUsersDto) {
      const { data } = await instance.get(`/admins/get-users`, { params: dto });
      return data;
   },
   async getUserById(id: number) {
      const { data } = await instance.get(`/admins/users/${id}`);
      return data;
   },
};
