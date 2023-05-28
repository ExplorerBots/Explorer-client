import BlockTitle from '@/app/components/ui/general/blockTitle/BlockTitle';
import { useAppSelector } from '@/app/store/hooks';
import Head from 'next/head';
import BonusBlock from './components/BonusBlock';
import CentralLeftBlock from './components/CentralLeftBlock';
import CentralMiddleBlock from './components/CentralMiddleBlock';
import CentralRightBlock from './components/CentralRightBlock';
import styles from './styles.module.scss';

const ReplenishBalanceScreen = () => {
   const userSlice = useAppSelector((store) => store.user);
   const operationsSlice = useAppSelector((state) => state.operations);

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
                  {operationsSlice.data.length ? (
                     <>
                        <ul>
                           {operationsSlice.data.map((operation, i) => (
                              <li key={i}>
                                 <div className={styles.operation_item}>
                                    {operation.amount}
                                 </div>
                                 <div
                                    className={styles.operation_item}
                                    data-type="true"
                                 >
                                    {operation.type}
                                 </div>
                                 <div className={styles.operation_item}>
                                    {new Date(operation.date).toLocaleString()}
                                 </div>
                              </li>
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

export default ReplenishBalanceScreen;
