import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

export const withAuth = (Component: any) => {
   const Auth = (props: any) => {
      const router = useRouter();
      const isLoggedIn = useAppSelector((state) => state.user.data);

      const getAuthToken = () => {
         const { authToken } = parseCookies(null, 'authToken');
         return authToken;
      };

      useEffect(() => {
         const token = getAuthToken();
         if (typeof window !== 'undefined' && !token) {
            router.push('/auth/authorize');
            return;
         }

         if (
            typeof window !== 'undefined' &&
            token &&
            router.pathname.includes('auth')
         ) {
            router.push('/create-bot');
            return;
         }
      }, []);

      return <Component {...props} />;
   };

   return Auth;
};
