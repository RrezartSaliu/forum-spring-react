import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalState } from '../Util/useLocalStorage';
import fetchCall from '../Services/FetchService';
import '../css/navbar.css'
import ProfileMenu from './NavbarComponents/ProfileMenu';
import CategoriesMenu from './NavbarComponents/CategoriesMenu';
import FriendRequestsMenu from './NavbarComponents/FriendRequests';
import MessageMenu from './NavbarComponents/MessageMenu';



const ButtonAppBar = () =>{
  const [jwt, setJwt] = useLocalState('','jwt')
  const [userLoggedIn, setUserLoggedIn] = useState(jwt!=="");
  const [forumUser, setForumUser] = useState(null)

  const updateLoggedInUser = (newValue) =>{
    setUserLoggedIn(newValue)
  }

  const updateForumUser = (newValue) =>{
    setForumUser(newValue)
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
              <MessageMenu/>
              { forumUser && <>
                <FriendRequestsMenu forumUser={forumUser} updateForumUser={updateForumUser}/>
                </>
              }
              <CategoriesMenu/>
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
