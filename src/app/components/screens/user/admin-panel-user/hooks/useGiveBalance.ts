import { BalanceDifferenceDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin.service';
import { useMutation } from 'react-query';

export const useGiveBalance = (data: BalanceDifferenceDto) => {
   const { mutateAsync, isLoading } = useMutation(
      'give balance',
      (data: BalanceDifferenceDto) => {
         return adminService.giveBalance(data);
      }
   );

   return { mutateAsync, isLoading };
};
