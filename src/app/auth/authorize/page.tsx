'use client';
import styles from '@/components/screens/auth/authorize/styles.module.scss';
import InputError from '@/components/shared/InputError';
import { routes } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { IAuthorizeFields } from '@/interfaces';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const AuthorizePage: FC = () => {
   const [data, setData] = useState({ email: '', password: '' });
   const { authorize } = useAuth();

   const userSlice = {
      data: {},
      isError: false,
      isLoading: false,
      errorMessage: '',
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IAuthorizeFields>({});

   const onSubmit: SubmitHandler<IAuthorizeFields> = (data) => {
      authorize({ password: data.password, email: data.email });
   };

   return (
      <>
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
                        <Image
                           className={styles.svg}
                           src="/auth/mail.svg"
                           alt="Нету изображения"
                           height={20}
                           width={20}
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
                        <Image
                           className={styles.svg}
                           src="/auth/lock.svg"
                           alt="Нету изображения"
                           height={20}
                           width={20}
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
                        // true
                        <Image
                           src="/svg/preloader.svg"
                           width={20}
                           height={20}
                           alt=""
                           loading="eager"
                           priority={true}
                           fetchPriority="high"
                        />
                     ) : (
                        'Войти'
                     )}
                  </button>
                  <div className={styles.cont_right}>
                     <p className={styles.answer}>
                        <Link
                           href={routes.RESTORE_PASSWORD}
                           className={styles.link}
                        >
                           {' '}
                           Забыл пароль
                        </Link>
                     </p>
                     <p className={styles.answer}>
                        <Link
                           href={routes.REGISTRATION}
                           className={styles.link}
                        >
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

export default AuthorizePage;
