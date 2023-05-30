import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { AuthorizeUserDto } from '../interfaces';
import { authorizeUser, removeUserData } from '../store/slices/user';

export const useAuth = () => {
   const dispatch = useAppDispatch();
   const userSlice = useAppSelector((state) => state.user.data);
   const router = useRouter();

   const logout = () => {
      dispatch(removeUserData());
      destroyCookie({}, 'authToken', { path: '/' });
   };

   const authorize = (data: AuthorizeUserDto) => {
      dispatch(authorizeUser(data));
   };

   const registration = () => {}; //todo Доделать регистрацию в useAuth

   return { logout, authorize, registration };
};
