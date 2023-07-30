import { BuyProxyDto } from '@/app/interfaces';
import { proxyService } from '@/app/services/proxy/proxy.service';
import { useMutation } from 'react-query';

export const useBuyProxy = () => {
   const {
      mutateAsync: buyProxy,
      isLoading,
      error,
   } = useMutation('buy proxy', (data: BuyProxyDto) =>
      proxyService.buyProxy(data)
   );

   return { buyProxy, isLoading, error };
};
