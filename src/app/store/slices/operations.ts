import { UserService } from '@/app/services/user.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '..';
import { IOperation } from './../../interfaces/index';

interface OperationsState {
   data: IOperation[];
   isLoading: boolean;
}

const initialState = {
   data: [
      // { amount: 100, type: 'ЮMoney', date: 1684958015088 },
      // { amount: 1000, type: 'Ручная выдача', date: 1684989125088 },
   ],
   isLoading: true,
} as OperationsState;
//
export const getOperations = createAsyncThunk(
   'user/getOperations',
   async (_, { rejectWithValue }) => {
      try {
         return await UserService.getOperations();
      } catch (err) {
         if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
         }
      }
   }
);
//
const operationsSlice = createSlice({
   name: 'operations',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getOperations.pending.type, (state: OperationsState) => {
            state.isLoading = true;
         })
         .addCase(
            getOperations.fulfilled.type,
            (state: OperationsState, action: PayloadAction<IOperation[]>) => {
               state.isLoading = false;
               state.data = action.payload;
            }
         )
         .addCase(getOperations.rejected.type, (state: OperationsState) => {
            state.isLoading = false;
         });
   },
});

export const selectOperationsData = (state: RootState) => state.operations.data;
// export const {} = operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;
