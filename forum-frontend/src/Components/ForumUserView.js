import { useLocalState } from "../Util/useLocalStorage";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Container, Paper, CircularProgress, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";

const ForumUserView = () => {
    const forumUserId = window.location.href.split('/forum-user/')[1]
    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ otherForumUser, setOtherForumUser ] = useState(null)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const navigate = useNavigate()
    const [ forumUser, setForumUser ] = useState(null)
    const [ isFriend, setIsFriend ] = useState(false) 
    const [ requestSent, setRequestSent ] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:8080/ForumUser/${forumUserId}`,{
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        }
        }).then((response)=>{
            if(response.status === 256)
                navigate('/my-profile')
            if(response.status === 200)
                return response.json()
        }).then((fUser)=>{
            setOtherForumUser(fUser)
            fetch('http://localhost:8080/ForumUser/my-profile',{
                headers: {
                    "Content-Type":  "application/json",
                    Authorization: `Bearer ${jwt}`
                }
                }
                ).then((response)=>{
                    if(response.status === 200)
                        return response.json()
                }).then((forumUser)=>{
                    setForumUser(forumUser)
                    forumUser.friends.map((friend)=>{
                        if(String(friend.id) === forumUserId)
                            setIsFriend(true)
                    })
                })
            })
    },[])

    const sendFriendRequest = () =>{
        const receiverId = { id: otherForumUser.fUserId }
        
        fetch(`http://localhost:8080/ForumUser/send-friend-request`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: 'POST',
            body: JSON.stringify(receiverId)
        }).then((response)=>{
            if (response.status === 200)
                return response.json
        })
    }

    return ( 
        <div style={{ padding: '15vh'}}>
            {otherForumUser?
            (
                    <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc'}}>
                        <h3 style={{ float: 'right', display: 'block' }}>
                            Friends: {otherForumUser.friends.length}
                            <div>Recent Activity</div>
                            <div>Hello</div>
                        </h3>
                        <h3>{otherForumUser.firstName} {otherForumUser.lastName}</h3>
                        <h4>{otherForumUser.emailAddress}</h4>
                        <h5>{moment(otherForumUser.dateOfBirth).tz(userTimeZone).format('DD-MM-YYYY')}</h5>
                        {
                            !isFriend? <Button onClick={()=>sendFriendRequest()}>Add Friend</Button>: <></>
                        }   
                    </Container>
                    </Paper>
            ):
            <CircularProgress color="inherit" />
        }
        </div>
     );
}
 
export default ForumUserView;