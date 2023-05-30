import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { parseCookies, setCookie } from 'nookies';
import { IUser, RegistrationUserDto } from '../interfaces';
import { AuthorizeUserDto, UpdateUserDto } from '../interfaces/index';

const getAuthToken = () => {
   const { authToken } = parseCookies(null, 'authToken');
   return authToken;
};

const instance = axios.create({
   baseURL: 'http://192.168.1.212:8080/api',
   headers: {
      options: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${getAuthToken()}` || false,
      },
   },
});

export const UserService = {
   async registration(dto: RegistrationUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/registration', dto, {});

      this.setCookieToken(data.token);
      return this.tokenDecode(data.token);
   },
   async authorize(dto: AuthorizeUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/authorize', dto, {});

      this.setCookieToken(data.token);
      return this.tokenDecode(data.token);
   },
   async update(dto: UpdateUserDto): Promise<IUser> {
      const { data } = await instance.post('/auth/update', dto);

      this.setCookieToken(data.token);
      return this.tokenDecode(data.token);
   },

   tokenDecode(token: string): IUser {
      return jwt_decode(token);
   },
   setCookieToken(token: string) {
      setCookie(null, 'authToken', token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });
   },
};
