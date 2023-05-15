import AuthorizeForm from '@/app/components/ui/forms/authorizeForm/AuthorizeForm';
import Head from 'next/head';
import { FC } from 'react';

const AuthorizePage: FC = () => {
   return (
      <>
         <Head>
            <title>EBots - Авторизация</title>
         </Head>

         <AuthorizeForm />
      </>
   );
};

export default AuthorizePage;
