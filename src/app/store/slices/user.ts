import { UserService } from '@/app/services/user.service'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IUser, UserLoginDto, UserRegistrationDto } from '../../interfaces'

interface UserState {
   data: IUser | null
   _isLoading: boolean
}

const initialState = {
   data: null,
   _isLoading: false,
} as UserState



export const registrationUser = createAsyncThunk(
   'user/registrationUser',
   async (dto: UserRegistrationDto,) => {
      return await UserService.registration(dto)
   }
)

export const authorizeUser = createAsyncThunk(
   'user/authorizeUser',
   async (dto: UserLoginDto,) => {
      return await UserService.authorize(dto)
   }
)


const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUserData(state, action: PayloadAction<IUser | null>) {
         state.data = action.payload
      },
      removeUserData(state, action: PayloadAction<IUser>) {
         state.data = null
      }
   },
   extraReducers: {
      [registrationUser.pending.type]: (state: UserState, action: PayloadAction<IUser>) => {
         state._isLoading = true
      },
      [registrationUser.fulfilled.type]: (state: UserState, action: PayloadAction<IUser>) => {
         state._isLoading = false
         state.data = action.payload
      },

      [authorizeUser.pending.type]: (state: UserState, action: PayloadAction<IUser>) => {
         state._isLoading = true
      },
      [authorizeUser.fulfilled.type]: (state: UserState, action: PayloadAction<IUser>) => {
         state._isLoading = false
         state.data = action.payload
      },
   },
   // extraReducers: (builder) => {
   //    builder
   //       .addCase(registrationUser, (state: UserState, action: PayloadAction<IUser>) => {

   //       })
   // },
})






export const selectUserData = (state: RootState) => state.user.data
export const { setUserData } = userSlice.actions
export const userReducer = userSlice.reducer