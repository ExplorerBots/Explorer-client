import { IBot } from '@/app/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface BotState {
   data: IBot[];
   isLoading: boolean;
   isError: boolean;
   errorMessage: string | undefined;
}

const initialState = {
   data: [
      {
         botId: 120,
         isPremium: true,
         username: 'petya',
         server: 'HolyWorld',
         status: 'online',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
      {
         botId: 120,
         isPremium: false,
         username: 'petya',
         server: 'HolyWorld',
         status: 'offline',
         endDate: 1684950139475 + 86400000 * 30,
      },
   ],
   isLoading: false,
   isError: false,
   errorMessage: '',
} as BotState;

// = = = = = = = = = = = = = = = = = = = = = =

// = = = = = = = = = = = = = = = = = = = = = =

const botsSlice = createSlice({
   name: 'bots',
   initialState,
   reducers: {
      addBot(state: BotState, action: PayloadAction<IBot>) {
         state.data.push(action.payload);
      },
   },
   extraReducers: (builder) => {},
});

export const selectBotsData = (state: RootState) => state.bots.data;
export const { addBot } = botsSlice.actions;
export const botsReducer = botsSlice.reducer;
