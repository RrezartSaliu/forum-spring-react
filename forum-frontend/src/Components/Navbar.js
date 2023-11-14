import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalState } from '../Util/useLocalStorage';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';
import fetchCall from '../Services/FetchService';
import '../css/navbar.css'
import ProfileMenu from './NavbarComponents/ProfileMenu';
import CategoriesMenu from './NavbarComponents/CategoriesMenu';



const ButtonAppBar = () =>{
  const [jwt, setJwt] = useLocalState('','jwt')
  const [userLoggedIn, setUserLoggedIn] = useState(jwt!=="");
  const [anchorElFriendReq, setAnchorElFriendReq] = React.useState(null)
  const openFriendRequest = Boolean(anchorElFriendReq)
  const [forumUser, setForumUser] = useState(null)

  const updateLoggedInUser = (newValue) =>{
    setUserLoggedIn(newValue)
  }

  const handleClickFriendReq = (event) => {
    setAnchorElFriendReq(event.currentTarget)
  }


  const handleAcceptRequest = (senderId) => {
    fetchCall('http://localhost:8080/ForumUser/accept-friend-request', 'POST', JSON.parse(localStorage.getItem('jwt')), { id: senderId })
    .then((response)=>{
      if(response.status === 200){
        const updatedRequest = forumUser.receivedRequests.filter((req)=> req.id !== senderId)
        setForumUser({...forumUser, receivedRequests: updatedRequest})
    }}
    )
  }


  const handleDeclineRequest = (senderId) => {
    fetchCall('http://localhost:8080/ForumUser/decline-friend-request', 'POST', JSON.parse(localStorage.getItem('jwt')), { id: senderId })
    .then((response)=>{
      if(response.status === 200){
        const updatedRequest = forumUser.receivedRequests.filter((req)=> req.id !== senderId)
        setForumUser({...forumUser, receivedRequests: updatedRequest})
    }}
    )
  }

  useEffect(()=>{
    const handleStorageChange = (e) => {
      setUserLoggedIn(true)
      fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', JSON.parse(localStorage.getItem('jwt')), null, 'return-response-json')
      .then((forumUser)=>{
          console.log(forumUser);
          setForumUser(forumUser)
      })
      };

      fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', JSON.parse(localStorage.getItem('jwt')), null, 'return-response-json')
      .then((forumUser)=>{
          console.log(forumUser);
          setForumUser(forumUser)
      })


    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  },[])


 
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" style={{ background: '#506c69'}} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className='navbar-font' to='/' style={{ color: 'white', textDecoration: 'none' }}>
              ThreadTalk
            </Link>
          </Typography>
          { !userLoggedIn?(<div>
            <Link to="/login" style={{ color: 'white' }}>  
              <Button color="inherit" className='navbar-font'>Login</Button>
            </Link>
            <Link to="/signup" style={{ color: 'white' }}>  
              <Button color="inherit" className='navbar-font'>Sign Up</Button>
            </Link></div>)
            :<div>
              { forumUser && 
              <>
            
              <CategoriesMenu/>

              <Button style={{ color: 'white'}} 
              id="friendRequest-button"
              aria-controls={openFriendRequest ? 'friendReq-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openFriendRequest ? 'true' : undefined}
              onClick={handleClickFriendReq}
              color='inherit'
              >

              <Badge badgeContent={forumUser.receivedRequests.length} color="primary">
                <PeopleIcon />
              </Badge>
            
              </Button>
              

              <Menu
              id="friendReq-menu"
              anchorEl={anchorElFriendReq}
              open={openFriendRequest}
              onClose={()=>setAnchorElFriendReq(null)}
              MenuListProps={{
                'aria-labelledby': 'friendRequest-button',
              }}
            >
            
              
              { forumUser.receivedRequests.length !== 0 ? (forumUser.receivedRequests.map((req)=>(
              <MenuItem key={req.id} onClick={()=>{
              }} className='navbar-font'>{req.firstName} {req.lastName}
              <Button onClick={()=>handleAcceptRequest(req.id)}>Accept</Button><Button onClick={()=>handleDeclineRequest(req.id)}>Decline</Button>
              </MenuItem>))):<div>No friend requests</div>
              }
            </Menu>
              </>
              }
              <Link to="/createTopic" style={{ color: 'white' }}>  
              <Button color="inherit"><div className='navbar-font'>Create Topic</div></Button>
            </Link>
            
              <ProfileMenu userLoggedIn={userLoggedIn} updateLoggedInUser={updateLoggedInUser}/>

            </div>
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar
