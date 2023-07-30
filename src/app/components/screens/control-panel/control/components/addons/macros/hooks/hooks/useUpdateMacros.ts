import { IBotMacrosBlock } from '@/app/interfaces';
import { botsService } from '@/app/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useUpdateMacros = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'update macros',
      ({ macrosId, blocks }: { macrosId: number; blocks: IBotMacrosBlock[] }) =>
         botsService.updateMacros(blocks, macrosId)
   );

   return { mutateAsync, isLoading, error };
};
