import { configureStore } from '@reduxjs/toolkit';
import { botsReducer } from './slices/bots';
import { operationsReducer } from './slices/operations';
import { userReducer } from './slices/user';

export const store = configureStore({
   reducer: {
      user: userReducer,
      bots: botsReducer,
      operations: operationsReducer,
   },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
