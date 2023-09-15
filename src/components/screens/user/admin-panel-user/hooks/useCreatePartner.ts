import { CreatePartnerDto } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useCreatePartner = () => {
   const {
      mutateAsync: createPartner,
      isLoading,
      error,
   } = useMutation('admin:create partner', (data: CreatePartnerDto) =>
      adminService.createPartner(data)
   );

   return { createPartner, isLoading, error };
};
