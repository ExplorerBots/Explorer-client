import { useAppSelector } from '../store/hooks';

const user = useAppSelector((state) => state.user);
export const useAuth = () => {
   const data = user.data;
   console.log(data);

   return data;
};
