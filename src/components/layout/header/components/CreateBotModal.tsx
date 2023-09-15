import { UserContext } from '@/app/UserProvider';
import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useGetProxies } from '@/hooks/bot/useGetProxies';
import { ICreateBotFields, IPartnerPromocode, IProxy } from '@/interfaces';
import Image from 'next/image';
import {
   FC,
   PropsWithChildren,
   useContext,
   useEffect,
   useId,
   useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useBuyBot } from '../hooks/useBuyBot';
import { useCheckPromo } from '../hooks/useCheckPromo';
import styles from '../styles.module.scss';

interface ICreateBotModalProps {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const CreateBotModal: FC<PropsWithChildren<ICreateBotModalProps>> = ({
   active,
   setActive,
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm<ICreateBotFields>({});
   const formId = useId();

   const [ownedProxies, setOwnedProxies] = useState<IProxy[]>([]);

   const [username, setUsername] = useState<string>('');
   const [server, setServer] = useState<string>('HolyWorld');
   const [type, setType] = useState<string>('Premium');
   const [days, setDays] = useState<number>(30);
   const [promo, setPromo] = useState<string>('');
   const [proxyType, setProxyType] = useState<string>(
      ownedProxies ? 'owned' : 'buy'
   );
   const [proxy, setProxy] = useState<string>(
      ownedProxies[0]
         ? `${ownedProxies[0].host}:${ownedProxies[0].port}:${ownedProxies[0].username}:${ownedProxies[0].password}`
         : ''
   );

   useEffect(() => console.log(proxy), [proxy]);

   const [showCheckPromo, setShowCheckPromo] = useState<boolean>(false);
   const [promoError, setPromoError] = useState<string>('');
   const [promoSuccess, setPromoSuccess] = useState<string>('');
   const [readyPromo, setReadyPromo] = useState<IPartnerPromocode | null>(null);
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const { isLoggedIn } = useContext(UserContext);
   const { buyBot, isLoading: buyBotLoading } = useBuyBot();
   const { checkPromo } = useCheckPromo();
   const { getProxies, isLoading: getProxiesLoading } = useGetProxies();

   useEffect(() => {
      handlePreload();
   }, []);

   const handlePreload = async () => {
      // const response = await getProxies();
      // setOwnedProxies(response);
   };

   const handleCheckPromo = async () => {
      const response = await checkPromo(promo)
         .catch((err) => {
            setPromoError(err?.response?.data?.message);
            return;
         })
         .finally(() => setShowCheckPromo(false));

      if (!response) return;

      setReadyPromo(response);
      setPromoSuccess(
         response.type === 'discount'
            ? `Скидка ${response.value}%`
            : `+${response.value} дней`
      );
   };

   const handleSubmitModal: SubmitHandler<ICreateBotFields> = async (data) => {
      const response = await buyBot({
         username,
         isPremium: type === 'Premium' ? true : false,
         server,
         period: days,
         promocode: readyPromo || undefined,
      }).catch((err) => {
         toast.error(err?.response?.data?.message);
         return;
      });

      if (!response) return;

      window.localStorage.setItem('authToken', response.token);
      // dispatch(setUserData(userService.tokenDecode(response.token)));
      toast.success('Успешная покупка бота!');
   };

   const handleCloseModal = () => setActive(false);

   return (
      <DefaultModal
         title="Покупка бота"
         active={active}
         loading={buyBotLoading || getProxiesLoading}
         onClose={handleCloseModal}
         submitButtonId={formId}
      >
         <form
            className={styles.modal_body}
            onSubmit={handleSubmit(handleSubmitModal)}
            id={formId}
         >
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Никнейм</div>
               <input
                  {...register('username', {
                     required: 'Обязательное поле',
                     minLength: {
                        value: 3,
                        message: 'Минимум 3 символа',
                     },
                     maxLength: {
                        value: 16,
                        message: 'Максимум 16 символов',
                     },
                  })}
                  type="text"
                  className={styles.input_text}
                  data-error={errors.username}
                  placeholder="Fruktik"
                  onChange={(e) => setUsername(e.currentTarget.value)}
               />
               {errors.username && (
                  <div className={styles.input_error}>
                     {errors.username?.message}
                  </div>
               )}
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Сервер</div>
               <select
                  className={styles.select}
                  onChange={(e) => setServer(e.currentTarget.value)}
               >
                  <option value="HolyWorld">HolyWorld</option>
                  <option value="FunTime">FunTime</option>
                  <option value="ProstoCraft">ProstoCraft</option>
               </select>
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Ранг</div>
               <select
                  className={styles.select}
                  onChange={(e) => setType(e.currentTarget.value)}
               >
                  <option value="Premium">Premium</option>
                  <option value="Classic">Classic</option>
               </select>
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Срок</div>
               <input
                  type="range"
                  className={styles.input_text}
                  min={5}
                  max={60}
                  defaultValue={days}
                  onChange={(e) => setDays(Number(e.currentTarget.value))}
               />
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Промокод</div>
               <input
                  type="text"
                  className={styles.input_text}
                  placeholder="Сапочек дает промокоды?"
                  onChange={(e) => {
                     setPromo(e.currentTarget.value);
                     setShowCheckPromo(true);
                     setPromoError('');
                  }}
               />
               {promoError && (
                  <div className={styles.input_error}>{promoError}</div>
               )}
               {promoSuccess && (
                  <div className={styles.input_success}>{promoSuccess}</div>
               )}
               {showCheckPromo && (
                  <button
                     className={styles.check_promo}
                     onClick={handleCheckPromo}
                     type="button"
                  >
                     <Image
                        src="/svg/check.svg"
                        alt=""
                        width={18}
                        height={16}
                     />
                  </button>
               )}
            </div>
            <div className={styles.result}>
               <p>Итого: {totalPrice} ₽</p>
               <p>Срок: {days} дней</p>
            </div>
         </form>
      </DefaultModal>
   );
};

export default CreateBotModal;
