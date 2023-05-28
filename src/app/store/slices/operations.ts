import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IOperation } from './../../interfaces/index';

interface OperationsState {
   data: IOperation[];
   isLoading: boolean;
   isError: boolean;
   errorMessage: string | undefined;
}

const initialState = {
   data: [
      { amount: 100, type: 'ЮMoney', date: 1684958015088 },
      { amount: 1000, type: 'Ручная выдача', date: 1684989125088 },
   ],
   isLoading: false,
   isError: false,
   errorMessage: '',
} as OperationsState;

const operationsSlice = createSlice({
   name: 'operations',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder;
   },
});

export const selectOperationsData = (state: RootState) => state.operations.data;
// export const {} = operationsSlice.actions;
export const operationsReducer = operationsSlice.reducer;
