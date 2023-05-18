import BlockTitle from '@/app/components/ui/blockTitle/BlockTitle';
import BonusBlock from '@/app/components/ui/replenish-balance/BonusBlock';
import CentralLeftBlock from '@/app/components/ui/replenish-balance/CentralLeftBlock';
import CentralMiddleBlock from '@/app/components/ui/replenish-balance/CentralMiddleBlock';
import CentralRightBlock from '@/app/components/ui/replenish-balance/CentralRightBlock';
import styles from '@/app/styles/replenish-balance.module.scss';
import Head from 'next/head';

const ReplenishBalancePage = () => {
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

export default ReplenishBalancePage;
