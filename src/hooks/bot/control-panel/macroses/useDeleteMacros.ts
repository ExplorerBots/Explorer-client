import { botsService } from '@/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useDeleteMacros = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'delete macros',
      (id: number) => botsService.deleteMacros(id)
   );

   return { mutateAsync, isLoading, error };
};
