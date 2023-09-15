import { UserContext } from '@/app/user/admin-panel/users/[id]/UserContext';
import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useDeletePartner } from '@/hooks/user/admin-panel/users/[id]/useDeletePartner';
import { useContext } from 'react';
import { toast } from 'react-toastify';
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
