import { botsService } from '@/services/bots/bots.service';
import { AddToWhitelistDto } from '@/services/bots/types';
import { useMutation } from 'react-query';

export const useAddToWhitelist = () => {
   const {
      mutateAsync: addToWhitelist,
      isLoading,
      error,
   } = useMutation('whitelist add', (data: AddToWhitelistDto) =>
      botsService.addToWhitelist(data)
   );

   return { addToWhitelist, isLoading, error };
};
