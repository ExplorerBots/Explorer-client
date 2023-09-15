import { UserContext } from '@/app/UserProvider';
import { userService } from '@/services/user/user.service';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { AuthorizeUserDto } from '../interfaces';

export const useAuth = () => {
   const { setUser, setIsLoggedIn } = useContext(UserContext);

   const logout = () => {
      setUser(null);
      setIsLoggedIn(false);
      window.localStorage.removeItem('authToken');
   };

   const authorize = (data: AuthorizeUserDto) => {};

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
