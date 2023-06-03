export const getDaysLeft = (endDate: string): string | number => {
   const currentTime = Date.now();
   const endTime = new Date(endDate).getTime();
   if (currentTime > endTime) return 'истекший';

   return Math.floor((endTime - currentTime) / 1000 / 60 / 60 / 24);
};
