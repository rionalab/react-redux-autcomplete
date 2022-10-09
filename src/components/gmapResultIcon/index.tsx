import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import ClearIcon from '@mui/icons-material/Clear'
import style from './style.module.scss'

interface IProps {
   showHistory: boolean
   hover: boolean
   loading: boolean
   handleRemove: () => void
}

function GmapResultIcon({ showHistory, hover, loading, handleRemove }: IProps) {
   const isBtnDelete = showHistory && hover
   const isBtnHistory = showHistory && !hover

   const handleClick = (e: any) => {
      e.stopPropagation()
      handleRemove()
   }

   return (
      <button
         disabled={loading}
         {...(isBtnDelete && { onClick: (e) => handleClick(e) })}
         className={`
         ${style.iconSearchResultItemBtn} 
         ${isBtnDelete ? style.hasHover : ''}
      `}
      >
         {isBtnHistory && (
            <QueryBuilderIcon className={style.iconSearchResultItem} />
         )}
         {isBtnDelete && (
            <ClearIcon className={style.iconSearchResultItemDelete} />
         )}
         {!showHistory && (
            <PlaceOutlinedIcon className={style.iconSearchResultItem} />
         )}
      </button>
   )
}

export default GmapResultIcon
