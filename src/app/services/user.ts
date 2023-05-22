import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setCookie } from 'nookies';
import { IUser, RegistrationUserDto } from '../interfaces';
import { AuthorizeUserDto, UpdateUserDto } from './../interfaces/index';

const instance = axios.create({
   baseURL: 'http://localhost:8080/api',
   headers: {
      options: {
         'Content-Type': 'application/json',
      },
   },
});

export const UserService = {
   async registration(dto: RegistrationUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/registration', dto);

      setCookie(null, 'authToken', data.token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });

      return this.tokenDecode(data.token);
   },

   async authorize(dto: AuthorizeUserDto) {
      const { data } = await instance.post('/auth/authorize', dto);

      setCookie(null, 'authToken', data.token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });

      return this.tokenDecode(data.token);
   },

   async update(dto: UpdateUserDto) {
      const { data } = await instance.post('/auth/update', dto);

      setCookie(null, 'authToken', data.token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });

      return this.tokenDecode(data.token);
   },

   async test() {
      const user = await instance.get('/auth/test');
      return user.data;
   },
   tokenDecode(token: string): IUser {
      return jwt_decode(token);
   },
};
