import MapContainer from './features/map/MapContainer'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { resetSnackbar, selectMain } from 'features/main/mainSlice'
import { Snackbar } from '@mui/material'
import SlideSnackbar from 'components/layouts/slideSnackbar'

function App() {
   const {
      snackBar: { open, message },
   } = useAppSelector(selectMain)
   const dispatch = useAppDispatch()

   const handleClose = () => {
      dispatch(resetSnackbar())
   }

   return (
      <>
         <MapContainer />
         <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            TransitionComponent={SlideSnackbar}
            message={message}
         />
      </>
   )
}

export default App
