import Divider from '@/app/components/ui/general/divider/Divider';
import Select from '@/app/components/ui/general/select/Select';
import { ICreateBotFields, IPartnerPromocode } from '@/app/interfaces';
import { useAppDispatch } from '@/app/store/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../styles.module.scss';
import InputField from './InputField';
import InputRange from './InputRange';
import PromoInput from './PromoInput';

const CentralMiddleBlock = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm<ICreateBotFields>({});

   const [username, setUsername] = useState<string>('');
   const [server, setServer] = useState<string>('HolyWorld');
   const [type, setType] = useState<string>('Premium');
   const [days, setDays] = useState<number>(20);
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(false);
   const [promo, setPromo] = useState<string>('');
   const [activePromo, setActivePromo] = useState<IPartnerPromocode | null>(
      null
   );

   useEffect(() => {
      // if (type === 'Premium') {
      //    setTotalPrice(days * botPrice.PREMIUM_BOT_PRICE_PER_DAY);
      // } else {
      //    setTotalPrice(days * botPrice.CLASSIC_BOT_PRICE_PER_DAY);
      // }
   }, [days, type]);

   const buyBot: SubmitHandler<ICreateBotFields> = async (data) => {
      // setLoading(true);
      // const res = await botsService
      //    .buyBot({
      //       username,
      //       isPremium: type === 'Premium' ? true : false,
      //       server,
      //       days,
      //    })
      //    .then((data) => {
      //       window.localStorage.setItem('authToken', data.token);
      //       dispatch(setUserData(userService.tokenDecode(data.token)));
      //       toast.success('Успешная покупка бота!', {});
      //    })
      //    .catch((err) => {
      //       toast.error('Недостаточно денег на балансе!', {});
      //    })
      //    .finally(() => setLoading(false));
   };

   return (
      <form
         className={styles.internal_container}
         data-side="middle"
         onSubmit={handleSubmit(buyBot)}
      >
         <p className={styles.title}>Создание бота</p>
         <Divider text="Никнейм бота" />
         <InputField
            register={register}
            errors={errors}
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Никнейм"
         />
         <Divider text="Сервер бота" />
         <Select
            options={['HolyWorld', 'ProstoCraft', 'FunTime', 'MST']}
            setValue={setServer}
         />
         <Divider text="Тип бота" />
         <Select options={['Premium', 'Classic']} setValue={setType} />
         <Divider text="Срок аренды" />
         <InputRange value={days} onChange={setDays} />
         <Divider text="Промокод" />
         <PromoInput value={promo} onChange={setPromo} placeholder="Промокод" />
         <div className={styles.input_price}>
            <p>Итого: {totalPrice} ₽</p>
            <p>Срок: {days} дней</p>
         </div>
         <div className={styles.submit_container}>
            {loading ? (
               <button className={styles.submit_btn}>
                  <Image
                     src="/svg/preloader.svg"
                     width={20}
                     height={20}
                     alt=""
                  />
               </button>
            ) : (
               <button
                  className={styles.submit_btn}
                  type="submit"
                  onClick={handleSubmit(buyBot)}
               >
                  Купить
               </button>
            )}
         </div>
      </form>
   );
};

export default CentralMiddleBlock;
