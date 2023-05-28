import { withAuth } from '@/app/hoc/withAuth';
import Head from 'next/head';
import { FC } from 'react';

const HelpPage: FC = () => {
   return (
      <>
         <Head>
            <title>EBots - Помощь</title>
         </Head>
      </>
   );
};

export default withAuth(HelpPage);
