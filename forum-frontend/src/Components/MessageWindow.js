import { Button, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from "react";
import fetchCall from "../Services/FetchService";
import { useLocalState } from "../Util/useLocalStorage";


const MessageWindow = ({ forumUser, closeMessageWindow, topicId }) => {
    const [ message, setMessage ] = useState('')
    const [ jwt, setJwt ] = useLocalState('', 'jwt')

    const handleSendMessage = (e, friendId) => {
        e.preventDefault()

        const request = { message, receiverId: friendId, topicLink: `/topics/${topicId}`}
        fetchCall('http://localhost:8080/message/send-message', 'POST', jwt, request)
    }

    return ( 
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '100', cursor: 'pointer'}}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', maxHeight: '70%', overflow: 'auto', padding: '20px', border: '1px solid #ccc'}}>
            <Button onClick={()=>closeMessageWindow()}><HighlightOffIcon/></Button>
                <TextField placeholder="Add message..." value={message} onChange={(e)=>setMessage(e.target.value)}></TextField>
                {
                    forumUser.friends.map((friend)=>
                    (
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            {friend.firstName + ' ' +friend.lastName}<Button onClick={(e)=>handleSendMessage(e, friend.id, )}>Send</Button>
                        </div>
                    )
                    )
                }
            </div>
        </div>
     );
}
 
export default MessageWindow;