import { DeleteLinkDto } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
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
