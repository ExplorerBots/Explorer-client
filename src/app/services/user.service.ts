import axios from 'axios'
import jwt_decode from "jwt-decode"
import { setCookie } from 'nookies'
import { IUser, UserLoginDto, UserRegistrationDto } from '../interfaces'

const instance = axios.create({
   baseURL: 'http://localhost:8080/api'
})

export const UserService = {
   async registration(dto: UserRegistrationDto) {
      const { data } = await instance.post('/auth/registration', dto)

      setCookie(null, 'authToken', data.token, {
         maxAge: 30 * 24 * 60 * 60, path: '/'
      })

      return this.tokenDecode(data.token)
   },
   async authorize(dto: UserLoginDto) {
      const { data } = await instance.post('/auth/login', dto)

      setCookie(null, 'authToken', data.token, {
         maxAge: 30 * 24 * 60 * 60, path: '/'
      })

      return this.tokenDecode(data.token)
   },
   tokenDecode(token: string): IUser {
      return jwt_decode(token)
   }
}

