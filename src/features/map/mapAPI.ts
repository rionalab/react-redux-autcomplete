import { ICenter } from './mapSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ISetCenterAsync {
   latLng: ICenter
   description: string
}

export const setCenterAsync = createAsyncThunk(
   'map/setCenterAsync',
   async (data: ISetCenterAsync, { rejectWithValue, getState }) => {
      try {
         const {
            map: { recents },
         }: any = getState()

         const result = new Promise((resolve) => {
            setTimeout(() => {
               const newValue = [...recents]

               const isExist = recents.find(
                  (row: any) => row.description === data.description
               )

               if (!isExist) {
                  newValue.push(data)
               }

               resolve({
                  center: data.latLng,
                  recents: newValue,
               })
            }, 0)
         })

         return result
      } catch (e: any) {
         rejectWithValue({ msg: e.message })
      }
   }
)

export const removeRecentAsync = createAsyncThunk(
   'map/removeRecentAsync',
   async (description: string, { rejectWithValue, getState }) => {
      try {
         const {
            map: { recents },
         }: any = getState()

         const result = await new Promise((resolve) => {
            setTimeout(() => {
               const newValue = recents
                  .map((row: any) =>
                     row.description !== description ? row : null
                  )
                  .filter(Boolean)

               resolve(newValue)
            }, 2000)
         })

         return result
      } catch (e: any) {
         rejectWithValue({ msg: e.message })
      }
   }
)
