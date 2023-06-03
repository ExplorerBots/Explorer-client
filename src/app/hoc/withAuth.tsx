import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { routes } from '../constants';
import { useAppSelector } from '../store/hooks';

export const withAuth = (Component: any) => {
   const Auth = (props: any) => {
      const router = useRouter();
      const isLoggedIn = useAppSelector((state) => state.user.data);

      const getAuthToken = () => {
         return window.localStorage.getItem('authToken');
      };

      useEffect(() => {
         const token = getAuthToken();
         if (typeof window !== 'undefined' && !token) {
            router.push(routes.AUTHORIZE);
            return;
         }
      }, []);

      return <Component {...props} />;
   };

   return Auth;
};
