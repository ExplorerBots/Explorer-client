'use client';
import '@/assets/globals.scss';
import Layout from '@/components/layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './UserProvider';

export const metadata = {
   title: 'Explorer Bots',
   description: 'Main',
};

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         keepPreviousData: true,
      },
   },
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head>
            <title>ExplorerBots</title>
         </head>
         <body>
            <ToastContainer
               position="top-right"
               autoClose={3000}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="dark"
               hideProgressBar={true}
            />
            <QueryClientProvider client={queryClient}>
               <UserProvider>
                  <Layout>
                     <div id="modal_portal" />
                     {children}
                  </Layout>
               </UserProvider>
            </QueryClientProvider>
         </body>
      </html>
   );
}
