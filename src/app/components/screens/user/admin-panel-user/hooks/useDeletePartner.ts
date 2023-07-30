import { DeletePartnerDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useDeletePartner = () => {
   const {
      mutateAsync: deletePartner,
      isLoading,
      error,
   } = useMutation('admin:delete partner', (data: DeletePartnerDto) =>
      adminService.deletePartner(data)
   );

   return { deletePartner, isLoading, error };
};
