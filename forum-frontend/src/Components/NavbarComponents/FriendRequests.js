import { Button, MenuItem, Menu, Badge } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import fetchCall from "../../Services/FetchService";
import { useState } from "react";

const FriendRequestsMenu = ({ forumUser, updateForumUser }) => {
    const [anchorElFriendReq, setAnchorElFriendReq] = useState(null)
    const openFriendRequest = Boolean(anchorElFriendReq)

    const handleClickFriendReq = (event) => {
        setAnchorElFriendReq(event.currentTarget)
      }

    const handleAcceptRequest = (senderId) => {
        fetchCall('http://localhost:8080/ForumUser/accept-friend-request', 'POST', JSON.parse(localStorage.getItem('jwt')), { id: senderId })
        .then((response)=>{
          if(response.status === 200){
            const updatedRequest = forumUser.receivedRequests.filter((req)=> req.id !== senderId)
            updateForumUser({...forumUser, receivedRequests: updatedRequest})
        }}
        )
      }

    const handleDeclineRequest = (senderId) => {
        fetchCall('http://localhost:8080/ForumUser/decline-friend-request', 'POST', JSON.parse(localStorage.getItem('jwt')), { id: senderId })
        .then((response)=>{
          if(response.status === 200){
            const updatedRequest = forumUser.receivedRequests.filter((req)=> req.id !== senderId)
            updateForumUser({...forumUser, receivedRequests: updatedRequest})
        }}
        )
      }

    return ( 
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
            
              
              { forumUser.receivedRequests.length !== 0 ? (forumUser.receivedRequests.map((req)=>(
              <MenuItem key={req.id} onClick={()=>{
              }} className='navbar-font'>{req.firstName} {req.lastName}
              <Button onClick={()=>handleAcceptRequest(req.id)}>Accept</Button><Button onClick={()=>handleDeclineRequest(req.id)}>Decline</Button>
              </MenuItem>))):<div>No friend requests</div>
              }
            </Menu>
        </>
     );
}
 
export default FriendRequestsMenu;