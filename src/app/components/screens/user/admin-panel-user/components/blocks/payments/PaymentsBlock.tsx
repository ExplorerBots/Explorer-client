import { FC, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import styles from '../../../styles.module.scss';

const PaymentsBlock: FC = () => {
   const { user } = useContext(UserContext);
   return (
      <div className={styles.block}>
         <div className={styles.block_title}>Платежи</div>

         <div className={styles.inner_block}>
            <div className={styles.list}>
               <ul className={styles.list_header}>
                  <li className={styles.item}>Айди</li>
                  <li className={styles.item}>Тип</li>
                  <li className={styles.item}>Сумма</li>
                  <li className={styles.item}>Дата</li>
               </ul>
               <div className={styles.list_content}>
                  {user?.payments.length ? (
                     <>
                        {user?.payments?.map((payment, i) => (
                           <ul key={i} className={styles.list_item}>
                              <li className={styles.item}>{payment.id}</li>
                              <li className={styles.item}>{payment.type}</li>
                              <li className={styles.item}>{payment.amount}</li>
                              <li className={styles.item}>
                                 {payment.createdAt &&
                                    new Date(
                                       payment.createdAt
                                    ).toLocaleString()}
                              </li>
                           </ul>
                        ))}
                     </>
                  ) : (
                     <div className={styles.empty_text}>Пусто</div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PaymentsBlock;
