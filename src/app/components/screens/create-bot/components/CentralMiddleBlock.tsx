import Divider from '@/app/components/ui/general/divider/Divider';
import Select from '@/app/components/ui/general/select/Select';
import { useState } from 'react';
import styles from '../styles.module.scss';
import InputField from './InputField';
import InputRange from './InputRange';
import PromoInput from './PromoInput';

const CentralMiddleBlock = () => {
   const [username, setUsername] = useState<string>('');
   const [server, setServer] = useState<string>('HolyWorld');
   const [promo, setPromo] = useState<string>('');
   const [term, setTerm] = useState<number>(20);
   const [totalPrice, setTotalPrice] = useState<number>(0);

   return (
      <div className={styles.internal_container}>
         <p className={styles.title}>Создание бота</p>

         <Divider text="Никнейм бота" />
         <InputField
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Никнейм"
         />

         <Divider text="Сервер бота" />
         <Select
            options={['HolyWorld', 'ProstoCraft', 'HelloWorld']}
            setValue={setServer}
         />

         <Divider text="Срок аренды" />
         <InputRange value={term} onChange={setTerm} />

         <div className={styles.input_price}></div>

         <Divider text="Промокод" />
         <PromoInput value={promo} onChange={setPromo} placeholder="Промокод" />

         <div className={styles.input_price}>
            <p>Итого: {totalPrice} ₽</p>
            <p>Срок: {term} дней</p>
         </div>

         <div className={styles.submit_container}>
            <button className={styles.submit_btn} type="submit">
               Купить
            </button>
         </div>
      </div>
   );
};

export default CentralMiddleBlock;
