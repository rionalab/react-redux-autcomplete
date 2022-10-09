import { useLoadScript } from '@react-google-maps/api'
import Gmap from 'components/gmap'
import GmapInput from 'components/gmapInput'
import PageLoader from 'components/PageLoader'
import style from './style.module.scss'

function MapContainer() {
   const { isLoaded } = useLoadScript({
      id: 'google-map-script',
      libraries: ['places'],
      googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY_ALT!,
   })

   if (!isLoaded) {
      return <PageLoader />
   }

   return (
      <div className={style.mapContainer}>
         <GmapInput />
         <Gmap />
      </div>
   )
}

export default MapContainer
