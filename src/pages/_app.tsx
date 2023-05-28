import '@/app/assets/globals.scss';
import Layout from '@/app/components/layout/Layout';
import store from '@/app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <Provider store={store}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
};
export default App;
