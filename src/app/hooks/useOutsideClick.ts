import { useEffect } from 'react';

export const useOutsideClick = (
   ref: any,
   setState: (state: boolean) => void
) => {
   useEffect(() => {
      function handleClickOutside(event: any) {
         if (ref.current && !ref.current.contains(event.target)) {
            setState(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [ref]);
};
