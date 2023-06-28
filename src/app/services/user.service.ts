import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { links } from '../constants';
import { IUser, RegistrationUserDto } from '../interfaces';
import { AuthorizeUserDto, UpdateUserDto } from '../interfaces/index';

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

export const UserService = {
   async getOperations() {
      const { data } = await instance.get('user/operations');
      return data;
   },

   async registration(dto: RegistrationUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/registration', dto, {});

      window.localStorage.setItem('authToken', data.token);
      return this.tokenDecode(data.token);
   },
   async authorize(dto: AuthorizeUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/authorize', dto, {});

      window.localStorage.setItem('authToken', data.token);
      return this.tokenDecode(data.token);
   },
   async update(dto: UpdateUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/update', dto);

      window.localStorage.setItem('authToken', data.token);
      return this.tokenDecode(data.token);
   },

   tokenDecode(token: string): IUser {
      return jwt_decode(token);
   },
};
