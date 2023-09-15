import { UserContext } from '@/app/user/admin-panel/users/[id]/UserContext';
import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useDeleteLink } from '@/hooks/user/admin-panel/users/[id]/useDeleteLink';
import { IPartnerLink } from '@/interfaces';
import { useContext } from 'react';
import { toast } from 'react-toastify';

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
