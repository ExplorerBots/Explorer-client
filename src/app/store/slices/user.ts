import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '..';
import { AuthorizeUserDto, IUser, RegistrationUserDto } from '../../interfaces';
import { userService } from '../../services/user/user.service';

interface UserState {
   data: IUser | null;
   isLoading: boolean;
   isError: boolean;
   errorMessage: string | undefined;
}

const initialState = {
   data: null,
   isLoading: false,
   isError: false,
   errorMessage: undefined,
} as UserState;

// = = = = = = = = = = = = = = = = = = = = = =

export const registrationUser = createAsyncThunk<IUser, RegistrationUserDto>(
   'user/registrationUser',
   async (dto: RegistrationUserDto, { rejectWithValue }) => {
      try {
         const response = await userService.registration(dto);
         toast.success('Успешная регистрация!');
         return response;
      } catch (err) {
         if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
         } else {
            throw new Error();
         }
      }
   }
);

export const authorizeUser = createAsyncThunk<IUser, AuthorizeUserDto>(
   'user/authorizeUser',
   async (dto: AuthorizeUserDto, { rejectWithValue }) => {
      try {
         const response = await userService.authorize(dto);
         toast.success('Успешная авторизация!');
         return response;
      } catch (err) {
         if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data);
         } else {
            throw new Error();
         }
      }
   }
);

export const updateUser = createAsyncThunk('user/updateUser', async () => {
   return await userService.update();
});

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUserData(state, action: PayloadAction<IUser | null>) {
         state.data = action.payload;
      },
      removeUserData(state) {
         state.data = null;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(registrationUser.pending.type, (state: UserState) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(
            registrationUser.fulfilled,
            (state: UserState, action: PayloadAction<IUser>) => {
               state.isLoading = false;
               state.isError = false;
               state.data = action.payload;
            }
         )
         .addCase(registrationUser.rejected, (state: UserState, action) => {
            state.isError = true;
            state.isLoading = false;
            // @ts-ignore
            state.errorMessage = action.payload?.message;
         })

         // ==

         .addCase(authorizeUser.pending.type, (state: UserState) => {
            state.isLoading = true;
            state.isError = false;
         })
         .addCase(
            authorizeUser.fulfilled,
            (state: UserState, action: PayloadAction<IUser>) => {
               state.isLoading = false;
               state.isError = false;
               state.data = action.payload;
            }
         )
         .addCase(authorizeUser.rejected, (state: UserState, action) => {
            state.isError = true;
            state.isLoading = false;
            // @ts-ignore
            state.errorMessage = action.payload?.message;
         })

         // ==

         .addCase(updateUser.pending.type, (state: UserState) => {
            state.isLoading = true;
         })
         .addCase(
            updateUser.fulfilled,
            (state: UserState, action: PayloadAction<IUser>) => {
               state.isLoading = false;
               state.data = action.payload;
            }
         );
   },
});

export const selectUserData = (state: RootState) => state.user.data;
export const { setUserData, removeUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
