import { IPartner } from '@/app/interfaces';
import { partnerService } from '@/app/services/partner/partner.service';
import { FC, useEffect, useState } from 'react';
import { PartnerContext } from './components/context/PartnerContext';
import LinksBlock from './components/LinksBlock';
import PromocodesBlock from './components/PromocodesBlock';
import styles from './styles.module.scss';

const PartnerScreen: FC = () => {
   const [partner, setPartner] = useState<IPartner | null>(null);

   useEffect(() => {
      partnerService
         .getPartner()
         .then((res) => setPartner(res))
         .finally(() => {});
   }, []);

   return (
      <PartnerContext.Provider value={{ partner, setPartner }}>
         <div className={styles.inner_container}>
            <div className={styles.partner_container}>
               <div className={styles.container_title}>Активный партнер</div>
               <LinksBlock />
               {/* <StatisticsBlock /> */}
               <PromocodesBlock />
            </div>
         </div>
      </PartnerContext.Provider>
   );
};

export default PartnerScreen;
