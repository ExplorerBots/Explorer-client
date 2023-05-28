export const getDaysLeft = (endDate: number) => {
   return Math.floor((endDate - Date.now()) / 1000 / 60 / 60 / 24);
};
