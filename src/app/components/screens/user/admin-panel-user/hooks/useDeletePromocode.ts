import { DeletePromocodeDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useDeletePromocode = () => {
   const {
      mutateAsync: deletePromocode,
      isLoading,
      error,
   } = useMutation('admin:delete promocode', (data: DeletePromocodeDto) =>
      adminService.deletePromocode(data)
   );

   return { deletePromocode, isLoading, error };
};
