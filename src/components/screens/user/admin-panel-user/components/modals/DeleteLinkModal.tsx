import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { IPartnerLink } from '@/interfaces';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useDeleteLink } from '../../hooks/useDeleteLink';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
   socials: IPartnerLink[];
}

const DeleteLinkModal = ({ active, setActive, socials }: Props) => {
   const { deleteLink, isLoading, error } = useDeleteLink();
   const { user, setUser } = useContext(UserContext);

   const handleSubmit = async () => {
      if (!user || !user.partner) return;

      const response = await deleteLink(
         socials.map((social) => ({ id: social.id }))
      );

      if (!response) return;

      setActive(false);
      toast.success('Вы удалили выбранные соц-сети');
      setUser({
         ...user,
         partner: {
            ...user.partner,
            links: [...user.partner.links].filter(
               (link) => !socials.includes(link)
            ),
         },
      });
   };
   const handleClose = () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title={'Удаление соц-сети'}
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_list}>
               {socials.map((social, i) => (
                  <div className={styles.list_item} key={i}>
                     <span className={styles.item_description}>
                        {social.service}
                     </span>
                     <div className={styles.item_body}>{social.link}</div>
                  </div>
               ))}
            </div>
         </div>
      </DefaultModal>
   );
};

export default DeleteLinkModal;
