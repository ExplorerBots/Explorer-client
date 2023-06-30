import { IFullUser } from '@/app/interfaces';
import { adminService } from '@/app/services/admin.service';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export const useUser = (
   id: number
): { data: IFullUser | undefined; isLoading: boolean; error: any } => {
   const { data, isLoading, error } = useQuery(
      ['user', id],
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
