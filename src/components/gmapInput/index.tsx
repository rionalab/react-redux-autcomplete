import { useMemo } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from 'use-places-autocomplete'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectMap } from 'features/map/mapSlice'
import style from './style.module.scss'
import { setCenterAsync } from 'features/map/mapAPI'
import { REQ_STATUS } from 'constants/main'
import GmapResultItem from 'components/gmapResultItem'

function GmapInput() {
   const dispatch = useAppDispatch()
   const { status, recents } = useAppSelector(selectMap)

   const {
      ready,
      value,
      setValue,
      suggestions: { data },
   } = usePlacesAutocomplete()

   const handleSelect = async (address: string) => {
      if (!address) {
         return
      }

      const gPlace = await getGeocode({ address })
      const latLng = getLatLng(gPlace[0])

      dispatch(setCenterAsync({ latLng, description: address }))
      // dispatch(setCenter({ latLng, address }))
   }

   const options = useMemo(() => {
      const optionByRecents = recents
         .slice(-4)
         .map(({ description }) => description)
         .reverse()
         .filter(Boolean)

      const optionBySearch = data.map(({ description }) => description)
      return data.length ? optionBySearch : optionByRecents
   }, [recents, data])

   return (
      <div className={style.inputContainer}>
         <Autocomplete
            options={options}
            value={value}
            freeSolo
            fullWidth={true}
            disabled={status === REQ_STATUS.LOADING}
            loadingText="Loading..."
            onChange={(event: any, selected: string | null) => {
               const cleanSelected = selected || ''
               setValue(cleanSelected, false)
               handleSelect(cleanSelected)
            }}
            clearIcon={null}
            loading={!ready}
            inputValue={value}
            className={style.autocomplete}
            onInputChange={(event, newInputValue) => {
               setValue(newInputValue)
            }}
            renderOption={(props, option: any) => {
               return (
                  <GmapResultItem
                     key={props.id}
                     showHistory={!data.length}
                     text={option}
                     boxProps={props}
                  />
               )
            }}
            id="map-autocomplete"
            renderInput={(params) => (
               <TextField
                  className={style.input}
                  {...params}
                  placeholder="Search place"
               />
            )}
         />
      </div>
   )
}

export default GmapInput
