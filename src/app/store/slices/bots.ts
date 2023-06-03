import { IBot } from '@/app/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface BotState {
   data: IBot[];
   isLoading: boolean;
}

const initialState = {
   data: [],
   isLoading: false,
} as BotState;

// = = = = = = = = = = = = = = = = = = = = = =

const botsSlice = createSlice({
   name: 'bots',
   initialState,
   reducers: {
      loading(state: BotState, action: PayloadAction<boolean>) {
         state.isLoading = action.payload;
      },
      addBot(state: BotState, action: PayloadAction<IBot>) {
         state.data.push(action.payload);
      },
      setBots(state: BotState, action: PayloadAction<IBot[]>) {
         state.data = action.payload.slice().reverse();
      },
   },
});

export const selectBotsData = (state: RootState) => state.bots.data;
export const { addBot, setBots, loading } = botsSlice.actions;
export const botsReducer = botsSlice.reducer;
