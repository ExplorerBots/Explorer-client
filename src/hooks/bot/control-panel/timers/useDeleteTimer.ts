import { botsService } from '@/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useDeleteTimer = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'delete timer',
      (id: number) => botsService.removeTimer(id)
   );

   return { mutateAsync, isLoading, error };
};
