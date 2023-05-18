import { useAppDispatch } from '@/app/store/hooks';
import { authorizeUser } from '@/app/store/slices/user';
import styles from '@/app/styles/authorize.module.scss';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const AuthorizePage: FC = () => {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useAppDispatch();

   const onSubmit = async () => {
      dispatch(authorizeUser({ email, password }));
      router.push('/');
   };

   return (
      <>
         <Head>
            <title>EBots - Авторизация</title>
         </Head>

         <div className={styles.screen}>
            <motion.div
               className={styles.form}
               initial={{ y: 20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.1 }}
            >
               <div className={styles.title_container}>
                  <p className={styles.title}>Авторизация</p>
               </div>

               <div className={styles.form_field}>
                  <div className={styles.prefix}>
                     <img
                        className={styles.svg}
                        src="/auth/mail.svg"
                        alt="Нету изображения"
                     />
                  </div>
                  <input
                     className={styles.input}
                     type="text"
                     placeholder="Почта"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className={styles.form_field}>
                  <div className={styles.prefix}>
                     <img
                        className={styles.svg}
                        src="/auth/lock.svg"
                        alt="Нету изображения"
                     />
                  </div>
                  <input
                     className={styles.input}
                     type="password"
                     placeholder="Пароль"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               <div className={styles.cont}>
                  <button className={styles.btn} onClick={() => onSubmit()}>
                     Войти
                  </button>
                  <div className={styles.cont_right}>
                     <p className={styles.answer}>
                        <Link href="/restore-password" className={styles.link}>
                           {' '}
                           Забыл пароль
                        </Link>
                     </p>
                     <p className={styles.answer}>
                        <Link href="/registration" className={styles.link}>
                           {' '}
                           Регистрация
                        </Link>
                     </p>
                  </div>
               </div>
            </motion.div>
         </div>
      </>
   );
};

export default AuthorizePage;
