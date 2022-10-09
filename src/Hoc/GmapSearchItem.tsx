import { useState } from 'react'
import { useAppDispatch } from 'app/hooks'
import { removeRecentAsync } from 'features/map/mapAPI'
import { setSnackbar } from 'features/main/mainSlice'

function HocGmapSearchItem(OriginalComponent: any) {
   const NewComponent = (props: any) => {
      const [hover, setHover] = useState(false)
      const [loading, setLoading] = useState(false)
      const dispatch = useAppDispatch()

      const toggleHover = () => {
         setHover(!hover)
      }

      const handleRemove = async (e: any) => {
         setLoading(true)
         dispatch(
            setSnackbar({
               open: true,
               message: 'Deleting data...',
            })
         )

         await dispatch(removeRecentAsync(props.text))

         setLoading(false)
         dispatch(
            setSnackbar({
               open: true,
               message: 'Deleted successfully',
            })
         )
      }

      return (
         <OriginalComponent
            {...props}
            hover={hover}
            loading={loading}
            toggleHover={toggleHover}
            handleRemove={handleRemove}
         />
      )
   }

   return NewComponent
}

export default HocGmapSearchItem
