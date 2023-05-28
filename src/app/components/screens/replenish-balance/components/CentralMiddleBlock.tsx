import { ChangeEvent, useState } from 'react';
import styles from '../styles.module.scss';

const CentralMiddleBlock = () => {
   const [amount, setAmount] = useState<number>(100);
   const [promo, setPromo] = useState<string>('');

   const calculateAmount = () => {
      if (amount >= 100 && amount <= 999) {
         return Math.round(amount * 0.05 + amount);
      } else if (amount >= 1000 && amount <= 15000) {
         return Math.round(amount * 0.15 + amount);
      } else if (amount <= 0) {
         return 0;
      } else {
         return amount;
      }
   };

   return (
      <>
         <div className={styles.internal_container}>
            <p className={styles.title}>Пополнить баланс</p>
            <div className={styles.input_field}>
               <input
                  type="number"
                  className={styles.input}
                  value={amount || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setAmount(Math.round(Number(e.target.value)))
                  }
                  placeholder="Сумма пополнения"
               />
            </div>

            <div className={styles.input_field}>
               <input
                  type="text"
                  className={styles.input}
                  value={promo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setPromo(e.target.value)
                  }
                  placeholder="Промокод"
               />
            </div>

            <div className={styles.input_result}>
               <p>Баланс будет пополнен на {calculateAmount()} ₽</p>
            </div>

            <div className={styles.submit_container}>
               <button className={styles.submit_btn} type="submit">
                  Пополнить
               </button>
            </div>
         </div>
      </>
   );
};

export default CentralMiddleBlock;
