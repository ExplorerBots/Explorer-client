import '@/app/assets/globals.scss';
import Layout from '@/app/components/layout/Layout';
import store from '@/app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
   return (
      <Provider store={store}>
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
      </Provider>
   );
};
export default App;
