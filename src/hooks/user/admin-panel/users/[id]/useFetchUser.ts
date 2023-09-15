import { IFullUser } from '@/interfaces';
import { adminService } from '@/services/admin/admin.service';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export const useFetchUser = (
   id: number
): { data: IFullUser | undefined; isLoading: boolean; error: any } => {
   const { data, isLoading, error } = useQuery(
      ['admin:get user', id],
      () => adminService.getUserById(id),
      {
         onError(err: any) {
            toast.error(err.message);
         },
         enabled: !!id,
      }
   );
   return { data, isLoading, error };
};
