import { IAuthorizeFields } from '@/app/interfaces';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { authorizeUser } from '@/app/store/slices/user';
import styles from '@/app/styles/authorize.module.scss';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { FC, PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const AuthorizePage: FC = () => {
   const [data, setData] = useState({ email: '', password: '' });
   const dispatch = useAppDispatch();
   const userSlice = useAppSelector((store) => store.user);

   const onAuthorize = async () => {
      dispatch(authorizeUser({ email: data.email, password: data.password }));
      router.push('/control-panel/bots');
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IAuthorizeFields>({});

   const onSubmit: SubmitHandler<IAuthorizeFields> = (data) => {
      dispatch(
         authorizeUser({
            password: data.password,
            email: data.email,
         })
      );
      if (userSlice.data) {
         router.push('/control-panel/bots');
      }
   };

   return (
      <>
         <Head>
            <title>EBots - Авторизация</title>
         </Head>

         <div className={styles.screen}>
            <motion.form
               className={styles.form}
               initial={{ y: 20, opacity: 0 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.1 }}
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className={styles.title_container}>
                  <p className={styles.title}>Авторизация</p>
               </div>

               <div className={styles.fields}>
                  <div className={styles.form_field}>
                     <div className={styles.prefix}>
                        <img
                           className={styles.svg}
                           src="/auth/mail.svg"
                           alt="Нету изображения"
                        />
                     </div>
                     <input
                        {...register('email', {
                           required: 'Обязательное поле',
                           pattern: {
                              value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                              message: 'Не валидная почта',
                           },
                        })}
                        className={styles.input}
                        type="text"
                        placeholder="Почта"
                        value={data.email}
                        onChange={(e) =>
                           setData({ ...data, email: e.target.value })
                        }
                        style={errors.email && { border: '1px solid #f75c48' }}
                     />
                  </div>
                  {errors.email && (
                     <InputError message={errors.email.message} />
                  )}
                  <div className={styles.form_field}>
                     <div className={styles.prefix}>
                        <img
                           className={styles.svg}
                           src="/auth/lock.svg"
                           alt="Нету изображения"
                        />
                     </div>
                     <input
                        {...register('password', {
                           required: 'Обязательное поле',
                           minLength: {
                              value: 6,
                              message: 'Не менее 6 символов',
                           },
                           maxLength: {
                              value: 20,
                              message: 'Не более 20 символов',
                           },
                        })}
                        className={styles.input}
                        type="password"
                        placeholder="Пароль"
                        value={data.password}
                        onChange={(e) =>
                           setData({ ...data, password: e.target.value })
                        }
                        style={
                           errors.password && { border: '1px solid #f75c48' }
                        }
                     />
                  </div>
                  {errors.password && (
                     <InputError message={errors.password.message} />
                  )}
               </div>

               <div className={styles.cont}>
                  <button type="submit" className={styles.submit_btn}>
                     {userSlice.isLoading ? (
                        <Image
                           src="/svg/preloader.svg"
                           width={20}
                           height={20}
                           alt=""
                        />
                     ) : (
                        'Войти'
                     )}
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
               {userSlice.isError && (
                  <div className={styles.server_error}>
                     {userSlice.errorMessage}
                  </div>
               )}
            </motion.form>
         </div>
      </>
   );
};

const InputError: FC<PropsWithChildren<{ message: string | undefined }>> = ({
   message,
}) => {
   return <p className={styles.input_error}>{message}</p>;
};

export default AuthorizePage;
