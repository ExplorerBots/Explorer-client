import { ChangeUsernameDto } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useChangeUsername = () => {
   const {
      mutateAsync: changeUsername,
      isLoading,
      error,
   } = useMutation('admin:change username', (data: ChangeUsernameDto) =>
      adminService.changeUsername(data)
   );

   return { changeUsername, isLoading, error };
};
