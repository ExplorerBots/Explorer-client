import { botsService } from '@/app/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useSetActivatedMacros = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'set activated macros',
      ({ botId, macrosId }: { botId: number; macrosId: number }) =>
         botsService.setActivatedMacros(botId, macrosId)
   );

   return { mutateAsync, isLoading, error };
};
