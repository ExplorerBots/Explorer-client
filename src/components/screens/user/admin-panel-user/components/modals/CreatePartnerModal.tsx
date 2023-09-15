import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useCreatePartner } from '../../hooks/useCreatePartner';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const CreatePartnerModal = ({ active, setActive }: Props) => {
   const { user, setUser } = useContext(UserContext);
   const { createPartner, isLoading, error } = useCreatePartner();

   const handleSubmit = async () => {
      if (!user) return;
      const response: any = await createPartner({ userId: user.id });

      if (!response) return;

      setUser({ ...user, partner: response });
      setActive(false);
      toast.success(`Выдали партнера ${response.id} пользователю ${user.id}`);
   };
   const handleClose = async () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title="Выдача партнера"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            Выдать партнера этому пользователю?
         </div>
      </DefaultModal>
   );
};

export default CreatePartnerModal;
