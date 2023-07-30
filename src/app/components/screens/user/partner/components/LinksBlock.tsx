import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { IPartnerLink } from '@/app/interfaces';
import { partnerService } from '@/app/services/partner/partner.service';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles.module.scss';
import { PartnerContext } from './context/PartnerContext';

const LinksBlock: FC = () => {
   const { partner, setPartner } = useContext(PartnerContext);

   const [activeModal, setActiveModal] = useState<boolean>(false);
   const [loadingModal, setLoadingModal] = useState<boolean>(false);
   const [link, setLink] = useState<string>('');
   const [service, setService] = useState<string>('Ютуб');

   const onCloseModal = () => {
      setActiveModal(false);
   };

   const onSubmitModal = () => {
      if (!partner) return;

      partnerService
         .createLink(service, link, partner.id)
         .then((res) => {
            setPartner({ ...partner, links: [...partner.links, res] });
            toast.success('Соцсеть добавлена!');
         })
         .finally(() => {
            setLoadingModal(false);
            onCloseModal();
         })
         .catch(() => {
            toast.error('Произошла ошибка');
         });
      setLoadingModal(true);
   };

   const onDeleteLink = (linkId: number) => {
      if (!partner) return;

      partnerService
         .deleteLink(linkId)
         .then((res: IPartnerLink) => {
            const remainingLinks = partner.links.filter(
               (link) => link.id !== res.id
            );
            setPartner({ ...partner, links: [...remainingLinks] });
            toast.success('Соцсеть удалена');
         })
         .finally(() => {
            setLoadingModal(false);
            onCloseModal();
         })
         .catch(() => {
            toast.error('Произошла ошибка');
         });
      setLoadingModal(true);
   };

   return (
      <div className={styles.links_block}>
         <div className={styles.block_title}>Твои соцсети</div>
         <div className={styles.links}>
            {partner?.links && partner?.links.length && (
               <>
                  {partner?.links.map((link, i) => (
                     <div className={styles.item} key={i}>
                        <div className={styles.left}>
                           <div className={styles.service}>{link.service}</div>
                           <a
                              className={styles.link}
                              href={link.link}
                              target="_blank"
                           >
                              {link.link}
                           </a>
                        </div>
                        <div className={styles.right}>
                           <div
                              className={styles.delete_block}
                              onClick={() => onDeleteLink(link.id)}
                           >
                              <Image
                                 src="/svg/cross-white.svg"
                                 alt=""
                                 width={20}
                                 height={20}
                                 className={styles.delete_image}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </>
            )}
         </div>
         <button
            className={styles.add_link}
            onClick={() => setActiveModal(true)}
         >
            Добавить
         </button>
         <DefaultModal
            active={activeModal}
            loading={loadingModal}
            title="Добавление соцсети"
            onClose={onCloseModal}
            onSubmit={onSubmitModal}
         >
            <div className={styles.modal_body}>
               <div className={styles.modal_field}>
                  <select
                     className={styles.select}
                     onChange={(e) => setService(e.currentTarget.value)}
                  >
                     <option value="Ютуб">Ютуб</option>
                     <option value="Вконтакте">Вконтакте</option>
                     <option value="Твич">Твич</option>
                     <option value="Кик">Кик</option>
                  </select>

                  <input
                     type="text"
                     className={styles.input}
                     onChange={(e) => setLink(e.currentTarget.value)}
                     placeholder="https://www.youtube.com/channel/UC6ZIY4bO1oTzk6mn_oPs7Pw"
                     onKeyDown={(e) => e.key === 'Enter' && onSubmitModal()}
                  />
               </div>
            </div>
         </DefaultModal>
      </div>
   );
};

export default LinksBlock;
