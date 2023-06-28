import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { botPrice } from '@/app/constants';
import { IBot } from '@/app/interfaces';
import { botsService } from '@/app/services/bots.service';
import { UserService } from '@/app/services/user.service';
import { useAppDispatch } from '@/app/store/hooks';
import { getMyBots } from '@/app/store/slices/bots';
import { setUserData } from '@/app/store/slices/user';
import { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

interface IExtendBotModalProps {
   extendBot: IBot | null;
   setExtendBot: (extendBot: IBot | null) => void;
}

const ExtendBotModal: FC<PropsWithChildren<IExtendBotModalProps>> = ({
   extendBot,
   setExtendBot,
}) => {
   const dispatch = useAppDispatch();

   const [extendPeriod, setExtendPeriod] = useState<number>(5);
   const [extendTotalPrice, setExtendTotalPrice] = useState<number>(0);
   const [extendLoading, setExtendLoading] = useState<boolean>(false);
   const [extendSuccess, setExtendSuccess] = useState<boolean>(false);
   const [extendError, setExtendError] = useState<boolean>(false);

   const OnSubmitExpiredModal = async () => {
      if (!extendBot) return;

      setExtendLoading(true);
      const res = await botsService
         .extendBot({
            botId: extendBot?.id,
            extensionPeriod: extendPeriod,
         })
         .then((data) => {
            window.localStorage.setItem('authToken', data.token);
            dispatch(setUserData(UserService.tokenDecode(data.token)));
            dispatch(getMyBots());
            toast.success('Успешное продление бота!', {});
            setExtendSuccess(true);
         })
         .catch((err) => {
            toast.error('Недостаточно денег на балансе!', {});
            setExtendError(true);
         })
         .finally(() => setExtendLoading(false));
   };
   const OnCloseExpiredModal = () => {
      setExtendBot(null);
      setExtendSuccess(false);
      setExtendError(false);
      setExtendLoading(false);
   };

   useEffect(() => {
      if (extendBot?.isPremium) {
         setExtendTotalPrice(extendPeriod * botPrice.PREMIUM_BOT_PRICE_PER_DAY);
      } else {
         setExtendTotalPrice(extendPeriod * botPrice.CLASSIC_BOT_PRICE_PER_DAY);
      }
   }, [extendPeriod, extendBot?.isPremium]);

   return (
      <DefaultModal
         title="Продление бота"
         active={!!extendBot}
         onSubmit={OnSubmitExpiredModal}
         onClose={OnCloseExpiredModal}
         loading={extendLoading}
         showSubmitButton={extendSuccess || extendError ? false : true}
         error={extendError}
         errorText="Не достаточно средств на балансе!"
         success={extendSuccess}
         successText="Успешное продление бота!"
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_bot_info}>
               <div className={styles.id}>Айди: {extendBot?.id}</div>
               <div className={styles.username}>Ник: {extendBot?.username}</div>
               <div className={styles.type}>
                  Тип: {extendBot?.isPremium ? 'Premium' : 'Classic'}
               </div>
               <div className={styles.server}>Сервер: {extendBot?.server}</div>
            </div>
            <div className={styles.modal_period}>
               <input
                  min={5}
                  max={30}
                  step={5}
                  type="range"
                  className={styles.input_range}
                  value={extendPeriod || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setExtendPeriod(Number(e.target.value))
                  }
               />
            </div>
            <div className={styles.modal_results}>
               <p>Итого: {extendTotalPrice} ₽</p>
               <p>Срок: {extendPeriod} дней</p>
            </div>
         </div>
      </DefaultModal>
   );
};

export default ExtendBotModal;
