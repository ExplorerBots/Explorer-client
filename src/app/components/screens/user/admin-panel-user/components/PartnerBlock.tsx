import { FC, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styles from '../styles.module.scss';

const PartnerBlock: FC = () => {
   const { user } = useContext(UserContext);
   return (
      <div className={styles.block}>
         <div className={styles.block_title}>Партнерство</div>

         <div className={styles.inner_block}>
            <div className={styles.block_title}>Промокоды</div>
            <div className={styles.list}>
               <ul className={styles.list_header}>
                  <li className={styles.item}>Айди</li>
                  <li className={styles.item}>Код</li>
                  <li className={styles.item}>Активаций</li>
                  <li className={styles.item}>Значение</li>
                  <li className={styles.item}>Тип</li>
               </ul>
               <div className={styles.list_content}>
                  {user?.partner?.promocodes.map((promo, i) => (
                     <ul key={i} className={styles.list_item}>
                        <li className={styles.item}>{promo.id}</li>
                        <li className={styles.item}>{promo.code}</li>
                        <li className={styles.item}>
                           {promo.activations.length}
                        </li>
                        <li className={styles.item}>
                           {promo.type === 'discount'
                              ? `${promo.value}%`
                              : `+${promo.value} дней`}
                        </li>
                        <li className={styles.item}>{promo.type}</li>
                     </ul>
                  ))}
               </div>
               <div className={styles.list_footer}>
                  <button className={styles.button}>Создать</button>
                  <button className={styles.button}>Удалить</button>
               </div>
            </div>
         </div>

         <div className={styles.inner_block}>
            <div className={styles.block_title}>Социальные сети</div>
            <div className={styles.list}>
               <ul className={styles.list_header}>
                  <li className={styles.item}>Сервис</li>
                  <li className={styles.item}>Ссылка</li>
               </ul>
               <div className={styles.list_content}>
                  {user?.partner?.links.map((promo, i) => (
                     <ul key={i} className={styles.list_item}>
                        <li className={styles.item}>{promo.service}</li>
                        <li className={styles.item}>
                           {' '}
                           <a href={promo.link}>{promo.link}</a>{' '}
                        </li>
                     </ul>
                  ))}
               </div>
               <div className={styles.list_footer}>
                  <button className={styles.button}>Создать</button>
                  <button className={styles.button}>Удалить</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PartnerBlock;
