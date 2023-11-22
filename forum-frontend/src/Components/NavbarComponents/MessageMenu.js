import { Button, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import fetchCall from '../../Services/FetchService';
import { useLocalState } from '../../Util/useLocalStorage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MessageMenu = () => {
    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ showMessagesWindow, setShowMessagesWindow ] = useState(false)
    const [ messages, setMessages ] = useState([])
    const [ unreadMessagesNumber, setUnreadMessagesNumber ] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
    fetchCall('http://localhost:8080/message/get-messages', 'GET', jwt, null, 'return-response-json').then((messages)=>{
            const tempUnreadMessages = messages.filter((message)=> message.read !== true)
            setUnreadMessagesNumber(tempUnreadMessages.length);
            setMessages(messages);
    })
    },[])

    const handleRead = ( topicLink, isRead, receiverId, messageId ) => {
      if( !isRead ){
        fetchCall('http://localhost:8080/message/read-message', 'POST', jwt, { receiverId, messageId }).then((response)=>{
          if(response.status === 200)
            console.log('message read');
        }).then(()=>{
          fetchCall('http://localhost:8080/message/get-messages', 'GET', jwt, null, 'return-response-json').then((messages)=>{
            const tempUnreadMessages = messages.filter((message)=> message.read !== true)
            setUnreadMessagesNumber(tempUnreadMessages.length);
            setMessages(messages);
            }).then(()=>navigate(topicLink))
        })
      }
      setShowMessagesWindow(false)
    }

    return ( 
        <>
          { showMessagesWindow && 
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '100', cursor: 'pointer'}}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', maxHeight: '70%', overflow: 'auto', padding: '20px', border: '1px solid #ccc'}}>
              <Button onClick={()=>setShowMessagesWindow(false)}><HighlightOffIcon/></Button>
                  <div>
                    {
                      messages.map((message)=>(<div key={message.id} style={{ color: 'black' }}>{message.sender.firstName} {message.sender.lastName} sent you this topic: <Button onClick={()=>{handleRead(message.link, message.read, message.receiver.id, message.id )}}>click</Button></div>))
                    }
                  </div>
              </div>
            </div>
          } 
            <Button style={{ color: 'white'}} 

              onClick={()=>{setShowMessagesWindow(true)}}
              color='inherit'
              >

              <Badge badgeContent={unreadMessagesNumber} color="primary">
                <MessageOutlinedIcon/>
              </Badge>
                
              </Button>
        </>
     );
}
 
export default MessageMenu;