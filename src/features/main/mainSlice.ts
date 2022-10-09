import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

export interface IState {
   snackBar: any
}

const initialState: IState = {
   snackBar: {
      open: false,
      message: '',
   },
}

export const mainSlice = createSlice({
   name: 'main',
   initialState,
   reducers: {
      setSnackbar: (state, action: any) => {
         state.snackBar = action.payload
      },
      resetSnackbar: (state) => {
         state.snackBar = initialState.snackBar
      },
   },
})

export const { setSnackbar, resetSnackbar } = mainSlice.actions
export const selectMain = (state: RootState) => state.main
export default mainSlice.reducer
