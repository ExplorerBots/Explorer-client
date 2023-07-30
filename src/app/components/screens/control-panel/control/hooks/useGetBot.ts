import { botsService } from '@/app/services/bots/bots.service';
import { useQuery } from 'react-query';

export const useGetBot = (id: number | undefined) => {
   const { data, isLoading, error } = useQuery(
      ['get bot', id],
      () => botsService.getOne(id!),
      {
         enabled: !!id,
      }
   );

   return { data, isLoading, error };
};
