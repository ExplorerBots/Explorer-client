import { IUser } from '@/app/interfaces';
import { UserService } from '@/app/services/user';
import { GetStaticProps, NextPage } from 'next';
import { PropsWithChildren, useEffect } from 'react';

export const getStaticProps: GetStaticProps = async () => {
   const user = await UserService.test();
   console.log(user);
   return {
      props: {
         user,
      },
   };
};

const HomePage: NextPage<PropsWithChildren<{ user: IUser }>> = ({ user }) => {
   useEffect(() => console.log(user), [user]);
   return <></>;
};

export default HomePage;
