import { IChangeBot } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useChangeConfigBot = () => {
   const {
      isLoading,
      error,
      mutateAsync: changeBot,
   } = useMutation('admin:change bot', (data: IChangeBot) =>
      adminService.changeBot(data)
   );

   return { changeBot, isLoading, error };
};
