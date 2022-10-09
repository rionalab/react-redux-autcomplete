import { setCenterAsync, removeRecentAsync } from './mapAPI'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { defaultMapCenterLatLng } from 'configs/app'
import { REQ_STATUS } from 'constants/main'

export interface ICenter {
   lng: number
   lat: number
}

interface IRecent extends ICenter {
   description: string
}

export interface IState {
   isFirstLoad: boolean
   center: ICenter
   status: REQ_STATUS
   recents: IRecent[]
}

const initialState: IState = {
   isFirstLoad: true,
   status: REQ_STATUS.IDLE,
   center: defaultMapCenterLatLng,
   recents: [],
}

export const mapSlice = createSlice({
   name: 'map',
   initialState,
   reducers: {
      setCenter: (state, action: any) => {
         state.center = action.payload.latLng
         state.recents = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         // * setCenterAsync *
         .addCase(setCenterAsync.pending, (state) => {
            state.status = REQ_STATUS.LOADING
         })
         .addCase(setCenterAsync.fulfilled, (state, action: any) => {
            const { recents, center } = action.payload
            state.status = REQ_STATUS.IDLE
            state.center = center
            state.recents = recents
         })
         .addCase(setCenterAsync.rejected, (state) => {
            state.status = REQ_STATUS.FAILED
         })
         // * removeRecentAsync *
         .addCase(removeRecentAsync.fulfilled, (state, action: any) => {
            state.recents = action.payload
         })
   },
})

export const { setCenter } = mapSlice.actions
export const selectMap = (state: RootState) => state.map
export default mapSlice.reducer
