import { Box } from '@mui/material'
import style from './style.module.scss'
import HocGmapSearchItem from 'Hoc/GmapSearchItem'
import GmapResultIcon from 'components/gmapResultIcon'

interface IProps {
   text: string
   boxProps: Record<string, any>
   showHistory: boolean
   toggleHover: any
   hover: boolean
   loading: boolean
   handleRemove: any
}

function GmapResultItem(props: IProps) {
   const {
      text,
      boxProps,
      showHistory,
      toggleHover,
      hover,
      loading,
      handleRemove,
   } = props
   const [first, ...rest] = text.split(' ')

   return (
      <Box
         {...boxProps}
         onMouseEnter={toggleHover}
         onMouseLeave={toggleHover}
         className={style.searchResultItem}
         component="li"
      >
         <GmapResultIcon
            handleRemove={handleRemove}
            loading={loading}
            showHistory={showHistory}
            hover={hover}
         />

         <p className={style.labelSearchResultItem}>
            <span>{first} </span>
            {rest.join(' ')}
         </p>
      </Box>
   )
}

export default HocGmapSearchItem(GmapResultItem)
