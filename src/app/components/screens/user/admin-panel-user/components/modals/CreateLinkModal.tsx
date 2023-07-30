import DefaultModal from '@/app/components/ui/modals/defaultModal/DefaultModal';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useCreateLink } from '../../hooks/useCreateLink';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const CreateLinkModal = ({ active, setActive }: Props) => {
   const [link, setLink] = useState<string>('');
   const [service, setService] = useState<string>('Ютуб');

   const { user, setUser } = useContext(UserContext);
   const { createLink, isLoading, error } = useCreateLink();

   const handleSubmit = async () => {
      if (!user || !user.partner) return;

      const response = await createLink({
         link,
         service,
         partnerId: user.partner.id,
      });

      if (!response) return;

      setUser({
         ...user,
         partner: {
            ...user.partner,
            links: [...user.partner.links, response],
         },
      });

      toast.success('Вы создали социальную сеть');
      setActive(false);
   };
   const handleClose = async () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title="Создание социальной сети"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            <div className={styles.modal_field}>
               <div className={styles.field_title}>Ссылка</div>
               <input
                  type="text"
                  className={styles.input}
                  value={link}
                  onChange={(e) => {
                     setLink(e.currentTarget.value);
                  }}
               />
            </div>

            <div className={styles.modal_field}>
               <div className={styles.field_title}>Сервис</div>
               <select
                  className={styles.input}
                  value={service}
                  onChange={(e) => {
                     setService(e.currentTarget.value);
                  }}
               >
                  <option value="YouTube">YouTube</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Kick">Kick</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Vkontakte">Vkontakte</option>
               </select>
            </div>
         </div>
      </DefaultModal>
   );
};

export default CreateLinkModal;
