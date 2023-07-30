export const withAuth = (Component: any) => {
   const Auth = (props: any) => {
      // const router = useRouter();
      // const { isLoggedIn } = useContext(UserContext);

      // if (typeof window !== 'undefined' && !isLoggedIn) {
      // console.log('не залогинен');
      // router.push(routes.AUTHORIZE);
      // return;
      // }

      return <Component {...props} />;
   };
   return Auth;
};
