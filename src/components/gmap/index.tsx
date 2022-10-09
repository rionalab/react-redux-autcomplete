import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useAppSelector } from 'app/hooks'
import { defaultMapCenterLatLng } from 'configs/app'
import { selectMap } from 'features/map/mapSlice'
import { useEffect, useState } from 'react'
import { objIsEquals } from 'utils/helper'
import style from './style.module.scss'

function Gmap() {
   const { center } = useAppSelector(selectMap)
   const [showMarker, setShowMarker] = useState(false)

   const handleTilesLoaded = () => {
      setShowMarker(true)
   }

   useEffect(() => {
      setShowMarker(false)
   }, [center])

   const firstLoad = objIsEquals(defaultMapCenterLatLng, center)

   return (
      <>
         <GoogleMap
            onTilesLoaded={handleTilesLoaded}
            mapContainerClassName={style.map}
            zoom={10}
            center={center}
         >
            {!firstLoad && showMarker && <MarkerF position={center} />}
         </GoogleMap>
      </>
   )
}

export default Gmap
