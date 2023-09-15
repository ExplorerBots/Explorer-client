import { botsService } from '@/services/bots/bots.service';
import { CreateTimerDto } from '@/services/bots/types';
import { useMutation } from 'react-query';

export const useCreateTimer = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'create timer',
      (dto: CreateTimerDto) => botsService.createTimer(dto)
   );

   return { mutateAsync, isLoading, error };
};
