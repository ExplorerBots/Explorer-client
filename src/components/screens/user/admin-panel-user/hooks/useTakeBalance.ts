import { BalanceDifferenceDto } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useTakeBalance = () => {
   const { mutateAsync: takeBalance, isLoading: takeLoading } = useMutation(
      'admin:take balance',
      (data: BalanceDifferenceDto) => adminService.takeBalance(data)
   );

   return { takeBalance, takeLoading };
};
