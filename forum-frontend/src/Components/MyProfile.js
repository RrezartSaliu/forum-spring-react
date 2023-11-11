import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { Link } from "react-router-dom";
import { Container, Paper, CircularProgress, Button } from "@mui/material";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MyProfile = () => {

    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [forumUser, setForumUser] = useState(null)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [showFriendsList, setShowFriendsList] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
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
        console.log(forumUser);
        setForumUser(forumUser)
    })
    },[])

   

    return ( 
        <div style={{ padding: '15vh'}}>
            {
                showFriendsList?(
                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '100', cursor: 'pointer'}}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', maxHeight: '70%', overflow: 'auto', padding: '20px', border: '1px solid #ccc'}}>
                            <Button onClick={()=>setShowFriendsList(false)}><HighlightOffIcon/></Button>
                            {forumUser.friends.map((friend)=>(
                                <div key={friend.id}>{friend.firstName} {friend.lastName}<Button onClick={()=>navigate(`/forum-user/${friend.id}`)}>Go to profile</Button></div>
                            ))}
                        </div>
                    </div>
                    ):(<div></div>)}
                    {
                forumUser?(
                    

                    <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc'}}>
                        <h3 style={{ float: 'right', display: 'block' }}>
                            <Button onClick={()=>setShowFriendsList(true)}>Friends: {forumUser.friends.length}</Button>
                            <div>Recent Activity</div>
                            <div>Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</div>
                        </h3>
                        <h3>{forumUser.firstName} {forumUser.lastName}</h3>
                        <h4>{forumUser.emailAddress}</h4>
                        <h3>{forumUser.bio}</h3>
                        <h5>{moment(forumUser.dateOfBirth).tz(userTimeZone).format('DD-MM-YYYY')}</h5>
                        <Link to='/edit-myprofile'>Edit Profile</Link>
                    </Container>
                    </Paper>
                ):
                <CircularProgress color="inherit" />
            }      
        </div>
    );
}
 
export default MyProfile;