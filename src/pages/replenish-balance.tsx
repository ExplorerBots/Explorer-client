import BlockTitle from '@/app/components/ui/blockTitle/BlockTitle';
import styles from '@/app/styles/replenish-balance.module.scss';
import Head from 'next/head';
import { ChangeEvent, FC, PropsWithChildren, useState } from 'react';

const ReplenishBalancePage: FC = () => {
   let operationsHistory: any[] = [
      { amount: 350, type: 'ЮMoney', date: '15.05.2023, 21:31:44' },
   ];

   return (
      <>
         <Head>
            <title>EBots - Пополнение баланса</title>
         </Head>

         <div className={styles.bonus_container}>
            <BlockTitle text="Бонусы" />

            <div className={styles.content}>
               <BonusBlock
                  title="+5%"
                  description="При пополнении на сумму от 100 до 999 ₽"
               />
               <BonusBlock
                  title="+15%"
                  description="При пополнении на сумму от 1000 до 10000 ₽"
               />
            </div>
         </div>

         <div className={styles.central_container}>
            <BlockTitle text="Кошелёк" />

            <div className={styles.content}>
               <CentralLeftBlock />
               <CentralMiddleBlock />
               <CentralRightBlock />
            </div>
         </div>

         <div className={styles.last_container}>
            <BlockTitle text="История операций" />

            <div className={styles.content}>
               <div className={styles.header}>
                  <ul>
                     <li>Сумма</li>
                     <li>Тип</li>
                     <li>Дата</li>
                  </ul>
               </div>

               <div className={styles.operations_history}>
                  {operationsHistory.length ? (
                     <>
                        <ul>
                           {operationsHistory.map((item, i) => (
                              <li key={i}>{item.amount} ₽</li>
                           ))}
                        </ul>
                        <ul>
                           {operationsHistory.map((item, i) => (
                              <li key={i}>{item.type}</li>
                           ))}
                        </ul>
                        <ul>
                           {operationsHistory.map((item, i) => (
                              <li key={i}>{item.date}</li>
                           ))}
                        </ul>
                     </>
                  ) : (
                     <p>Ты еще не пополнял баланс :) </p>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

const CentralMiddleBlock: FC<PropsWithChildren<{}>> = () => {
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

const CentralLeftBlock: FC<PropsWithChildren<{}>> = () => {
   return (
      <div className={styles.internal_container}>
         <p className={styles.title}>Имеешь популярность?</p>
         <p className={styles.text}>
            У тебя на ютубе больше 2000 подписчиков, или стабильные 20 зрителей
            на твиче.
         </p>
         <p className={styles.text}>
            У нас есть для тебя партнерская программа
         </p>
         <a target="_blank" href="https://vk.com/write-217895304">
            <button className={styles.enter_button}>Напиши нам</button>
         </a>
      </div>
   );
};

const CentralRightBlock: FC<PropsWithChildren<{}>> = () => {
   return (
      <div className={styles.internal_container}>
         <p className={styles.title}>Проблемы с пополнением баланса?</p>
         <p className={styles.text}>
            У тебя нет банковской карты, или выбранный способ оплаты не тебе не
            подходит.
         </p>
         <p className={styles.text}>
            В таком случае, тебе стоит написать нам в ВК
         </p>
         <a target="_blank" href="https://vk.com/write-217895304">
            <button className={styles.enter_button}>Перейти в диалог</button>
         </a>
      </div>
   );
};

const BonusBlock: FC<
   PropsWithChildren<{ title: string; description: string }>
> = ({ title, description }) => {
   return (
      <div className={styles.bonus_block}>
         <p className={styles.bonus_title}>{title}</p>
         <p className={styles.bonus_description}>{description}</p>
      </div>
   );
};

export default ReplenishBalancePage;
