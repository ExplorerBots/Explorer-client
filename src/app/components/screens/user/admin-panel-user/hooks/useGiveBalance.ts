import { BalanceDifferenceDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useGiveBalance = () => {
   const { mutateAsync: giveBalance, isLoading: giveLoading } = useMutation(
      'admin:give balance',
      (data: BalanceDifferenceDto) => {
         return adminService.giveBalance(data);
      }
   );

   return { giveBalance, giveLoading };
};
