import { routes } from '@/app/constants';
import { withAuth } from '@/app/hoc/withAuth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
   const router = useRouter();
   useEffect(() => {
      router.push(routes.CONTROL_PANEL);
   }, []);
   return <></>;
};

export default withAuth(HomePage);
