import { useNavigate } from "react-router-dom";
import { MenuItem, Menu, Button, } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalState } from "../../Util/useLocalStorage";
import fetchCall from "../../Services/FetchService";
import '../../css/navbar.css'

const CategoriesMenu = () => {
    const [jwt,setJwt] = useLocalState('','jwt')
    const navigate = useNavigate()
    const [ anchorElCategories, setAnchorElCategories ] = useState(null)
    const openCategories = Boolean(anchorElCategories)
    const [ categories, setCategories ] = useState(null)

    const handleClickCategores = (event) =>{
        setAnchorElCategories(event.currentTarget)
    }

    useEffect(()=>{
        fetchCall('http://localhost:8080/topic/get-categories', 'GET', jwt, null, 'return-response-json')
        .then((categories)=>setCategories(categories))
    },[])

    return ( 
        <>
        <Button
              id="categories-button"
              aria-controls={openCategories ? 'categories-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openCategories ? 'true' : undefined}
              onClick={handleClickCategores}
              color='inherit'
            >
              <div className='navbar-font'>
              Categories
              </div>
            </Button>
              <Menu
              id="categories-menu"
              anchorEl={anchorElCategories}
              open={openCategories}
              onClose={()=>setAnchorElCategories(null)}
              MenuListProps={{
                'aria-labelledby': 'categories-button',
              }}
            >
              { categories && categories.map((cat)=>(
              <MenuItem key={cat} onClick={()=>{
                setAnchorElCategories(null)
                navigate(`/category-topics/${cat}`)
              }} className='navbar-font'>
                {cat}
              </MenuItem>))
              }
              </Menu></>
     );
}
 
export default CategoriesMenu;