import { Button, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import fetchCall from '../../Services/FetchService';
import { useLocalState } from '../../Util/useLocalStorage';

const MessageMenu = () => {
    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ showMessagesWindow, setShowMessagesWindow ] = useState(false)
    const [ messages, setMessages ] = useState([])


    useEffect(()=>{
    fetchCall('http://localhost:8080/message/get-messages', 'GET', jwt, null, 'return-response-json').then((messages)=>console.log(messages))
    },[])

    return ( 
        <>
          { showMessagesWindow && 
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '100', cursor: 'pointer'}}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', maxHeight: '70%', overflow: 'auto', padding: '20px', border: '1px solid #ccc'}}>
              <Button onClick={()=>setShowMessagesWindow(false)}><HighlightOffIcon/></Button>
                  
                  
              </div>
            </div>
          } 
            <Button style={{ color: 'white'}} 

              onClick={()=>{setShowMessagesWindow(true)}}
              color='inherit'
              >

              <Badge badgeContent={1} color="primary">
                <MessageOutlinedIcon/>
              </Badge>
                
              </Button>
        </>
     );
}
 
export default MessageMenu;