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
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';



const ButtonAppBar = () =>{
  const [jwt, setJwt] = useLocalState('','jwt')
  const [userLoggedIn, setUserLoggedIn] = useState(jwt!=="");
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElFriendReq, setAnchorElFriendReq] = React.useState(null)
  const open = Boolean(anchorEl);
  const openFriendRequest = Boolean(anchorElFriendReq)
  const [forumUser, setForumUser] = useState(null)

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickFriendReq = (event) => {
    setAnchorElFriendReq(event.currentTarget)
  }

  const handleAcceptRequest = (senderId) => {
    fetch('http://localhost:8080/ForumUser/accept-friend-request',{
        headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
        },
        method: 'POST',
        body: JSON.stringify({ id: senderId })
    }
    ).then(
      fetch('http://localhost:8080/ForumUser/my-profile',{
        headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
        }
    }
    ).then((response)=>{
        if(response.status === 200)
            return response.json()
    }).then((forumUser)=>{
        console.log(forumUser);
        setForumUser(forumUser)
    })
    )
  }

  useEffect(()=>{
    const handleStorageChange = (e) => {
    
    
      console.log(localStorage.getItem('jwt'))
      setUserLoggedIn(true)
      fetch('http://localhost:8080/ForumUser/my-profile',{
        headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
        }
    }
    ).then((response)=>{
        if(response.status === 200)
            return response.json()
    }).then((forumUser)=>{
        console.log(forumUser);
        setForumUser(forumUser)
    })
    };

    fetch('http://localhost:8080/ForumUser/my-profile',{
        headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
        }
    }
    ).then((response)=>{
        if(response.status === 200)
            return response.json()
    }).then((forumUser)=>{
        console.log(forumUser);
        setForumUser(forumUser)
    })

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  },[anchorEl])

 
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" style={{ background: '#506c69'}} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ color: 'white', textDecoration: 'none', fontFamily: 'Candara'}}>
              ThreadTalk
            </Link>
          </Typography>
          { !userLoggedIn?(<div>
            <Link to="/login" style={{ color: 'white' }}>  
              <Button color="inherit" style={{fontFamily: 'Candara'}}>Login</Button>
            </Link>
            <Link to="/signup" style={{ color: 'white' }}>  
              <Button color="inherit" style={{ fontFamily: 'Candara'}}>Sign Up</Button>
            </Link></div>)
            :<div>
              { forumUser &&
              <>
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
            
              
              { forumUser.receivedRequests.map((req)=>(
              <MenuItem key={req.id} onClick={()=>{
                navigate(`/forum-user/${req.id}`)
              }} style={{ fontFamily: 'Candara' }}>{req.firstName} {req.lastName}<Button onClick={()=>handleAcceptRequest(req.id)}>Accept</Button><Button>Decline</Button></MenuItem>))
              }
            </Menu>
              </>
              }
              <Link to="/createTopic" style={{ color: 'white' }}>  
              <Button color="inherit" style={{ fontFamily: 'Candara' }}>Create Topic</Button>
            </Link>
            
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
              }} style={{ fontFamily: 'Candara' }}>Profile</MenuItem>
              <MenuItem onClick={()=>{
                  setAnchorEl(null)
                  navigate('/my-topics')
              }} style={{ fontFamily: 'Candara',  }}>My Topics</MenuItem>
              <MenuItem onClick={()=>{
                localStorage.setItem('jwt',JSON.stringify(""))
                setUserLoggedIn(false)  
                setAnchorEl(null)     
                navigate("/")         
              }} style={{ fontFamily: 'Candara' }}>Logout</MenuItem>
            </Menu>

            </div>
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ButtonAppBar
