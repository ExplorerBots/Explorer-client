export const routes = {
   CONTROL_PANEL: '/bot/control-panel/',
   CREATE_BOT: '/bot/create/',
   SETTINGS: '/bot/settings/',
   ADMIN_PANEL: '/user/admin-panel/',
   PARTNER: '/user/partner/',
   AUTHORIZE: '/auth/authorize/',
   REGISTRATION: '/auth/registration/',
   RESTORE_PASSWORD: '/auth/restore-password/',
   REPLENISH_BALANCE: '/replenish-balance/',
   HELP: '/help/',
};

export const botPrice = {
   PREMIUM_PRICE: 2,
   CLASSIC_PRICE: 1.5,
   PROXY_PRICE: 1.2,
};

export const links = {
   // BACKEND: 'http://192.168.1.149/api',
   // SERVER: 'http://192.168.1.149:7070',
   BACKEND: 'http://26.67.250.2:8080/api',
   SERVER: 'http://26.67.250.2:7070',
};

export const limits = {
   CLASSIC_TIMER: 2,
   CLASSIC_MACROSES: 1,
   CLASSIC_MACROS_BLOCKS: 15,
   CLASSIC_WHITELIST: 3,

   PREMIUM_TIMER: 15,
   PREMIUM_MACROSES: 5,
   PREMIUM_MACROS_BLOCKS: 30,
   PREMIUM_WHITELIST: 15,
};
