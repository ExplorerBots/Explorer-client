import { FC, PropsWithChildren, useContext } from 'react';
import styles from '../styles.module.scss';
import { PartnerContext } from './context/PartnerContext';

const PromocodesBlock: FC<PropsWithChildren<unknown>> = () => {
   const { partner } = useContext(PartnerContext);

   return (
      <div className={styles.promocodes_block}>
         <div className={styles.block_title}>Промокоды</div>
         <ul className={styles.promocodes_header}>
            <li className={styles.item}>Код</li>
            <li className={styles.item}>Активаций</li>
            <li className={styles.item}>Значение</li>
            <li className={styles.item}>Тип</li>
         </ul>
         <div className={styles.promocodes}>
            {partner?.promocodes &&
               partner?.promocodes.map((promo) => (
                  <ul key={promo.id} className={styles.promocode}>
                     <li className={styles.item}>{promo.code}</li>
                     <li className={styles.item}>{promo.activations.length}</li>
                     <li className={styles.item}>
                        {promo.type === 'discount'
                           ? `${promo.value}%`
                           : `+${promo.value} дней`}
                     </li>
                     <li className={styles.item}>{promo.type}</li>
                  </ul>
               ))}
         </div>
      </div>
   );
};

export default PromocodesBlock;
