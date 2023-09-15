import { botsService } from '@/app/services/bots/bots.service';
import { IExtendBot } from '@/interfaces';
import { useMutation } from 'react-query';

export const useExtendBot = () => {
   const {
      mutateAsync: extendBot,
      isLoading,
      error,
   } = useMutation('extend bot', (data: IExtendBot) =>
      botsService.extendBot(data)
   );

   return { extendBot, isLoading, error };
};
