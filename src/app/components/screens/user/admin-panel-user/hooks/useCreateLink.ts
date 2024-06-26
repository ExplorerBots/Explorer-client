import { CreateLinkDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useCreateLink = () => {
   const {
      mutateAsync: createLink,
      isLoading,
      error,
   } = useMutation('admin:create link', (data: CreateLinkDto) =>
      adminService.createLink(data)
   );

   return { createLink, isLoading, error };
};
