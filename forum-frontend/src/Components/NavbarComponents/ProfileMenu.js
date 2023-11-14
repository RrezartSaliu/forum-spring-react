import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Menu, Button } from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

const ProfileMenu = ({ userLoggedIn, updateLoggedInUser }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const userLogOut = () =>{
        updateLoggedInUser(false)
    }

    const handleClickProfile = (event) => {
      setAnchorEl(event.currentTarget);
    };
    return <>
      <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickProfile}
              color='inherit'
            >
              <Person2OutlinedIcon></Person2OutlinedIcon>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={()=>setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>{
                setAnchorEl(null)
                navigate('/my-profile')
              }} className='navbar-font'>Profile</MenuItem>
              <MenuItem onClick={()=>{
                  setAnchorEl(null)
                  navigate('/my-topics')
              }} className='navbar-font'>My Topics</MenuItem>
              <MenuItem onClick={()=>{
                localStorage.setItem('jwt',JSON.stringify(""))
                userLogOut()
                setAnchorEl(null)     
                navigate("/")         
              }} className='navbar-font'>Logout</MenuItem>
            </Menu>
    </>
}
 
export default ProfileMenu;