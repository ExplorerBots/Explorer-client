import { IChangeBot } from '@/app/interfaces';
import { adminService } from '@/app/services/admin.service';
import { useMutation } from 'react-query';

export const useChangeConfigBot = () => {
   const {
      data: changedBot,
      isLoading,
      error,
      mutateAsync,
   } = useMutation('change bot', (data: IChangeBot) =>
      adminService.changeBot(data)
   );

   return { changedBot, isLoading, error, mutateAsync };
};
