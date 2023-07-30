import { IBuyBot } from '@/app/interfaces';
import { botsService } from '@/app/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useBuyBot = () => {
   const {
      mutateAsync: buyBot,
      isLoading,
      error,
   } = useMutation('buy bot', (data: IBuyBot) => botsService.buyBot(data));

   return { buyBot, isLoading, error };
};
