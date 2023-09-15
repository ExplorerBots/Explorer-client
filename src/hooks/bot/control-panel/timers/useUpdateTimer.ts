import { botsService } from '@/services/bots/bots.service';
import { UpdateTimerDto } from '@/services/bots/types';
import { useMutation } from 'react-query';

export const useUpdateTimer = () => {
   const { mutateAsync, isLoading, error } = useMutation(
      'update timer',
      ({ id, dto }: { id: number; dto: UpdateTimerDto }) =>
         botsService.updateTimer(id, dto)
   );

   return { mutateAsync, isLoading, error };
};
