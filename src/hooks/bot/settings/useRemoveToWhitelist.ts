import { botsService } from '@/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useRemoveToWhitelist = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'remove to whitelist',
      (id: number) => botsService.removeToWhitelist(id)
   );

   return { mutateAsync, isLoading, error };
};
