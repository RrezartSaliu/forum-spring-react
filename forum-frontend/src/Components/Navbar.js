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
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';



const ButtonAppBar = () =>{
  const [jwt, setJwt] = useLocalState('','jwt')
  const [userLoggedIn, setUserLoggedIn] = useState(jwt!=="");
  const [forumUser, setForumUser] = useState(null)
  const navigate = useNavigate()

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
          setForumUser(forumUser)
      })
      };

      fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', JSON.parse(localStorage.getItem('jwt')), null, 'return-response-json')
      .then((forumUser)=>{
          setForumUser(forumUser)
      })


    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  },[])


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
 

  const search = (input) =>{
    navigate(`/search/${input}`)
  }


 
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
            :<>
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e)=>{
                  if(e.key === 'Enter'){
                    search(e.target.value)
                  }
                }}
              />
              </Search>

              <div>
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
            </>
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar
