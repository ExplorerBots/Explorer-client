import { botsService } from '@/services/bots/bots.service';
import { CreateMacrosDto } from '@/services/bots/types';
import { useMutation } from 'react-query';

export const useCreateMacros = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'create macros',
      (dto: CreateMacrosDto) => botsService.createMacros(dto)
   );

   return { mutateAsync, isLoading, error };
};
