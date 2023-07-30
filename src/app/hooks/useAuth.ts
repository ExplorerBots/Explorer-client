import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserContext';
import { AuthorizeUserDto } from '../interfaces';
import { userService } from '../services/user/user.service';
import { authorizeUser } from '../store/slices/user';

export const useAuth = () => {
   const dispatch = useAppDispatch();
   const userSlice = useAppSelector((state) => state.user);
   const router = useRouter();
   const { setUser, setIsLoggedIn } = useContext(UserContext);

   const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
      window.localStorage.removeItem('authToken');
   };

   const authorize = (data: AuthorizeUserDto) => {
      dispatch(authorizeUser(data));
   };

   const {
      mutateAsync: update,
      isLoading: loadingUpdate,
      error: ErrorUpdate,
   } = useMutation('update user', () => userService.update(), {
      onSuccess(data) {
         console.log(data);
         // window.localStorage.setItem('authToken', data)
      },
   });

   const registration = () => {}; //todo Доделать регистрацию в useAuth

   return {
      logout,
      authorize,
      registration,
      update,
      loadingUpdate,
      ErrorUpdate,
   };
};
