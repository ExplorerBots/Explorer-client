import { UserContext } from '@/app/user/admin-panel/users/[id]/UserContext';
import styles from '@/app/user/admin-panel/users/[id]/_styles.module.scss';
import DefaultModal from '@/components/ui/modals/defaultModal/DefaultModal';
import { useCreatePartner } from '@/hooks/user/admin-panel/users/[id]/useCreatePartner';
import { useContext } from 'react';
import { toast } from 'react-toastify';

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
