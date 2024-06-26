import { GetUsersDto, IFullUser } from '@/app/interfaces';
import { adminService } from '@/app/services/admin/admin.service';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export const useUsers = (
   dto: GetUsersDto
): { users: IFullUser[] | undefined; isLoading: boolean; error: any } => {
   const {
      data: users,
      isLoading,
      error,
   } = useQuery(
      ['users list', dto],
      () =>
         adminService.getUsers({
            email: dto.email,
            username: dto.username,
            limit: dto.limit,
         }),
      {
         onError(err: any) {
            toast.error(err.message);
         },
      }
   );
   return { users, isLoading, error };
};
