'use client';
import { routes } from '@/constants';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
   const router = useRouter();
   useEffect(() => {
      router.push(routes.CONTROL_PANEL);
   }, []);
   return <></>;
};

export default HomePage;
