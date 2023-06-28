import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { ICreateBotFields, IPartnerPromocode } from '@/app/interfaces';
import { botsService } from '@/app/services/bots.service';
import { partnerService } from '@/app/services/partner.service';
import { UserService } from '@/app/services/user.service';
import { useAppDispatch } from '@/app/store/hooks';
import { setUserData } from '@/app/store/slices/user';
import Image from 'next/image';
import { FC, PropsWithChildren, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
   const dispatch = useAppDispatch();

   const [loading, setLoading] = useState<boolean>(false);
   const [username, setUsername] = useState<string>('');
   const [server, setServer] = useState<string>('HolyWorld');
   const [type, setType] = useState<string>('Premium');
   const [days, setDays] = useState<number>(30);
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const [promo, setPromo] = useState<string>('');
   const [showCheckPromo, setShowCheckPromo] = useState<boolean>(false);
   const [promoError, setPromoError] = useState<string>('');
   const [promoSuccess, setPromoSuccess] = useState<string>('');
   const [readyPromo, setReadyPromo] = useState<IPartnerPromocode | null>(null);

   const onCheckPromo = async () => {
      await partnerService
         .checkPromo(promo)
         .then((res: IPartnerPromocode) => {
            setReadyPromo(res);
            setPromoSuccess(
               res.type === 'discount'
                  ? `Скидка ${res.value}%`
                  : `+${res.value} дней`
            );
         })
         .catch((error) => {
            setPromoError(error?.response?.data?.message);
         })
         .finally(() => setShowCheckPromo(false));
   };
   const onSubmitModal: SubmitHandler<ICreateBotFields> = async (data) => {
      setLoading(true);
      let buyOptions;

      if (!readyPromo) {
         buyOptions = {
            username,
            isPremium: type === 'Premium' ? true : false,
            server,
            days,
         };
      } else {
         buyOptions = {
            username,
            isPremium: type === 'Premium' ? true : false,
            server,
            days,
            promocode: readyPromo,
         };
      }

      await botsService
         .buyBot(buyOptions)
         .then((data) => {
            window.localStorage.setItem('authToken', data.token);
            dispatch(setUserData(UserService.tokenDecode(data.token)));
            toast.success('Успешная покупка бота!', {});
         })
         .catch((err) => {
            toast.error('Недостаточно денег на балансе!', {});
         })
         .finally(() => setLoading(false));
   };
   const onCloseModal = () => {
      setActive(false);
   };
   return (
      <DefaultModal
         title="Покупка бота"
         active={active}
         loading={loading}
         onClose={onCloseModal}
         submitButtonId={formId}
      >
         <form
            className={styles.modal_body}
            onSubmit={handleSubmit(onSubmitModal)}
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
                     onClick={onCheckPromo}
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
