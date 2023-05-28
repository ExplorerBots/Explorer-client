import axios from 'axios';
import { parseCookies } from 'nookies';
import {
   BalanceDifferenceDto,
   ChangeRoleDto,
   ChangeUsernameDto,
} from '../interfaces';

const getAuthToken = () => {
   const { authToken } = parseCookies(null, 'authToken');
   return authToken;
};

const instance = axios.create({
   baseURL: 'http://localhost:8080/api',
   headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export const AdminService = {
   async giveBalance(dto: BalanceDifferenceDto) {
      return instance.put('/users/give-balance', dto);
   },
   async takeBalance(dto: BalanceDifferenceDto) {
      return instance.put('/users/take-balance', dto);
   },
   async changeRole(dto: ChangeRoleDto) {
      return instance.put('/users/change-role', dto);
   },
   async changeUsername(dto: ChangeUsernameDto) {
      return instance.put('/users/change-username', dto);
   },
   async getAllUsers() {
      const { data } = await instance.get('/user');
      return data;
   },
   async getUserById(id: number) {
      const { data } = await instance.get(`/users/${id}`);
      return data;
   },
};
