import '@/app/assets/globals.scss';
import Layout from '@/app/components/layout/Layout';
import { UserContextProvider } from '@/app/context/UserContext';
import store from '@/app/store';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         keepPreviousData: true,
      },
   },
});

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <QueryClientProvider client={queryClient}>
         <ClerkProvider>
            <Provider store={store}>
               <UserContextProvider>
                  <div id="modal_portal" />
                  <Layout>
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
                     <Component {...pageProps} />
                  </Layout>
               </UserContextProvider>
            </Provider>
         </ClerkProvider>
         {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
   );
};
export default App;
