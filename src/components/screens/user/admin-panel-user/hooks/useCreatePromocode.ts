import { CreatePromocodeDto } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useCreatePromocode = () => {
   const {
      mutateAsync: createPromocode,
      isLoading,
      error,
   } = useMutation('admin:create promocode', (data: CreatePromocodeDto) =>
      adminService.createPromocode(data)
   );

   return { createPromocode, isLoading, error };
};
