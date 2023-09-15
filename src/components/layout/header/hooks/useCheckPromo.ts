import { partnerService } from '@/services/partner/partner.service';
import { useMutation } from 'react-query';

export const useCheckPromo = () => {
   const {
      mutateAsync: checkPromo,
      isLoading: checkPromoLoading,
      error: checkPromoEror,
   } = useMutation('check promo', (code: string) =>
      partnerService.checkPromo(code)
   );

   return { checkPromo, checkPromoLoading, checkPromoEror };
};
