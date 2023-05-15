import RegistrationForm from '@/app/components/ui/forms/registrationForm/RegistrationForm';
import Head from 'next/head';
import { FC } from 'react';

const RegistrationPage: FC = () => {
   return (
      <>
         <Head>
            <title>EBots - Регистрация</title>
         </Head>

         <RegistrationForm />
      </>
   );
};

export default RegistrationPage;
