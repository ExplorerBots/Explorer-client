import '@/app/assets/globals.scss';
import Layout from '@/app/components/layout/Layout';
import store from '@/app/store';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
   useEffect(() => {
      // socket.on('alert', (data) => {
      //    toast(data.message, {
      //       style:
      //          data.type === 'green'
      //             ? { background: '#152519', color: '#4dc86a' }
      //             : { background: '#281616', color: '#e25353' },
      //    });
      // });
      // return () => {
      //    socket.disconnect();
      // };
   }, []);
   return (
      <Provider store={store}>
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
      </Provider>
   );
};
export default App;
