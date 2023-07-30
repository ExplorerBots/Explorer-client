import { proxyService } from '@/app/services/proxy/proxy.service';
import { useMutation } from 'react-query';

export const useGetProxies = () => {
   const {
      mutateAsync: getProxies,
      isLoading,
      error,
   } = useMutation('get proxies', () => proxyService.getProxies());

   return { getProxies, isLoading, error };
};
