'use client';
import BonusBlock from '@/components/screens/replenish-balance/BonusBlock';
import CentralLeftBlock from '@/components/screens/replenish-balance/CentralLeftBlock';
import CentralMiddleBlock from '@/components/screens/replenish-balance/CentralMiddleBlock';
import CentralRightBlock from '@/components/screens/replenish-balance/CentralRightBlock';
import styles from '@/components/screens/replenish-balance/styles.module.scss';
import BlockTitle from '@/components/ui/general/blockTitle/BlockTitle';

const ReplenishBalancePage = () => {
   return (
      <>
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
                  {/* {operationsSlice.data.length ? (
               <ul>
                  {operationsSlice.data.map((operation, i) => (
                     <li key={i}>
                        <div className={styles.operation_item}>
                           {operation.amount} ₽
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
            ) : (
               <>
                  {operationsSlice.isLoading ? (
                     <Image
                        src="/svg/preloader.svg"
                        width={40}
                        height={40}
                        alt=""
                     />
                  ) : (
                     <p>Ты еще не пополнял баланс :) </p>
                  )}
               </>
            )} */}
               </div>
            </div>
         </div>
      </>
   );
};

export default ReplenishBalancePage;
