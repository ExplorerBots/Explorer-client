import { DeleteLinkDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useDeleteLink = () => {
   const {
      mutateAsync: deleteLink,
      isLoading,
      error,
   } = useMutation('admin:delete link', (data: DeleteLinkDto[]) =>
      adminService.deleteLink(data)
   );

   return { deleteLink, isLoading, error };
};
