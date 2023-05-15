import Layout from '@/app/components/layout/Layout';
import store from '@/app/store';
import '@/app/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <Provider store={store}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </Provider>
      </>
   );
}
