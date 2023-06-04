import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { IBuyBot, IUser, RegistrationUserDto } from '../interfaces';
import { AuthorizeUserDto, UpdateUserDto } from '../interfaces/index';

// const authToken = window.localStorage.getItem('authToken');

const instance = axios.create({
   baseURL: 'http://26.67.250.2:8080/api',
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
   async myBots() {
      const { data } = await instance.get('user/my-bots');
      return data;
   },
   async getOperations() {
      const { data } = await instance.get('user/operations');
      return data;
   },
   async buyBot(dto: IBuyBot) {
      const { data } = await instance.post('user/buy-bot', dto);
      window.localStorage.setItem('authToken', data.token);

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
