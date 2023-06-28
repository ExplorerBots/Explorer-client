import '@/app/assets/globals.scss';
import Layout from '@/app/components/layout/Layout';
import store from '@/app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
   // const dispatch = useAppDispatch();
   // const userSlice = useAppSelector((state) => state.user);

   // useEffect(() => {
   //    const authToken = window.localStorage.getItem('authToken');
   //    if (authToken) {
   //       const { email } = UserService.tokenDecode(authToken);
   //       dispatch(updateUser({ email }));
   //    }
   // }, []);
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
