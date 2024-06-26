import { botsService } from '@/app/services/bots/bots.service';
import { AddToWhitelistDto } from '@/app/services/bots/types';
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
