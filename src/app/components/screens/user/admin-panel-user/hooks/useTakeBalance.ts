import { BalanceDifferenceDto } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useMutation } from 'react-query';

export const useTakeBalance = () => {
   const { mutateAsync: takeBalance, isLoading: takeLoading } = useMutation(
      'admin:take balance',
      (data: BalanceDifferenceDto) => adminService.takeBalance(data)
   );

   return { takeBalance, takeLoading };
};
