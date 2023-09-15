import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useDeletePartner } from '../../hooks/useDeletePartner';
import styles from '../../styles.module.scss';

interface Props {
   active: boolean;
   setActive: (bool: boolean) => void;
}

const DeletePartnerModal = ({ active, setActive }: Props) => {
   const { user, setUser } = useContext(UserContext);
   const { deletePartner, isLoading, error } = useDeletePartner();

   const handleSubmit = async () => {
      if (!user) return;
      const response: any = await deletePartner({ userId: user.id });

      if (!response) return;

      setUser({ ...user, partner: null });
      setActive(false);
      toast.success(
         `Вы удалили партнера ${response?.id} у пользователя ${user.id}`
      );
   };
   const handleClose = async () => setActive(false);

   return (
      <DefaultModal
         active={active}
         loading={isLoading}
         title="Удаление партнера"
         onSubmit={handleSubmit}
         onClose={handleClose}
      >
         <div className={styles.modal_body}>
            Забрать партнера у этого пользователя?
         </div>
      </DefaultModal>
   );
};

export default DeletePartnerModal;
