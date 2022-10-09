import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import mapReducer from 'features/map/mapSlice'
import mainReducer from 'features/main/mainSlice'

export const store = configureStore({
   reducer: {
      main: mainReducer,
      map: mapReducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>
