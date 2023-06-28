import { IBot } from '@/app/interfaces';
import { botsService } from '@/app/services/bots.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '..';

interface BotState {
   data: IBot[];
   isLoading: boolean;
}

const initialState = {
   data: [],
   isLoading: true,
} as BotState;

export const getMyBots = createAsyncThunk<IBot[]>(
   'bots/getMyBots',
   async (_, { rejectWithValue }) => {
      try {
         return await botsService.myBots();
      } catch (err) {
         if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
         }
      }
   }
);

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
         state.data = action.payload; //slice().reverse();
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getMyBots.pending.type, (state: BotState) => {
            state.isLoading = true;
         })
         .addCase(
            getMyBots.fulfilled,
            (state: BotState, action: PayloadAction<IBot[]>) => {
               state.isLoading = false;
               state.data = action.payload; //slice().reverse();
            }
         )
         .addCase(getMyBots.rejected, (state: BotState) => {
            state.isLoading = false;
         });
   },
});

export const selectBotsData = (state: RootState) => state.bots.data;
export const { addBot, setBots, loading } = botsSlice.actions;
export const botsReducer = botsSlice.reducer;
