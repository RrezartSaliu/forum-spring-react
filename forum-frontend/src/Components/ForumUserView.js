import { useLocalState } from "../Util/useLocalStorage";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Container, Paper, CircularProgress, Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom";
import fetchCall from "../Services/FetchService";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ForumUserView = () => {
    const forumUserId = useParams()
    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ otherForumUser, setOtherForumUser ] = useState(null)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const navigate = useNavigate()
    const [ forumUser, setForumUser ] = useState(null)
    const [ isFriend, setIsFriend ] = useState(false) 
    const [ requestSent, setRequestSent ] = useState(false)
    const [ recentTopics, setRecentTopics ] = useState([])
    const [ pageTopic, setPageTopic ] = useState(null)
    const [ showAllHistory, setShowAllHistory ] = useState(false)
    const [ recentTopicsForWindow, setRecentTopicsForWindow ] = useState([])


    useEffect(()=>{
        if(pageTopic !== null){
        const pageTopicReq = { page: pageTopic, size: 3, forumUserId: forumUserId }
        fetchCall('http://localhost:8080/topic/latest-topics', 'POST', jwt, pageTopicReq, 'return-response-json').then((topic)=>{
        if(topic.content.length !== 0){
            const newTopics = [...recentTopicsForWindow, ...topic.content]
            setRecentTopicsForWindow(newTopics)
        }
        else alert("Thats all the topics")
    })
    }
    },[pageTopic])

    useEffect(()=>{
        const pageTopicReq = { page: 0, size: 3, forumUserId: forumUserId }
        fetchCall('http://localhost:8080/topic/latest-topics', 'POST', jwt, pageTopicReq, 'return-response-json').then((topic)=>{
        if(topic.content.length !== 0){
            const newTopics = [...recentTopics, ...topic.content]
            setRecentTopics(newTopics)
        }
        else alert("Thats all the topics")
        })

        fetchCall(`http://localhost:8080/ForumUser/${forumUserId}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 256)
                navigate('/my-profile')
            if(response.status === 200)
                return response.json()
        }).then((fUser)=>{
            setOtherForumUser(fUser)
            fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', jwt, null, 'return-response-json')
            .then((forumUser)=>{
                if(forumUser.sentRequests.map((req)=> req.id).includes(parseInt(forumUserId)))
                    setRequestSent(true)

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
        fetchCall(`http://localhost:8080/ForumUser/send-friend-request`, 'POST', jwt, receiverId)
        setRequestSent(true)
    }

    const viewMoreTopics = () =>{
        setPageTopic(pageTopic+1)
    }

    return ( 
        <div style={{ padding: '15vh'}}>
                    {
                    showAllHistory?(
                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '100', cursor: 'pointer'}}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', maxHeight: '70%', overflow: 'auto', padding: '20px', border: '1px solid #ccc'}}>
                            <Button onClick={()=>
                                {
                                    setRecentTopicsForWindow([])
                                    setPageTopic(0)
                                    setShowAllHistory(false)}}><HighlightOffIcon/></Button>
                            {
                                recentTopicsForWindow.map((topic)=>(
                                
                                    <div key={topic.id}>{topic.title}</div>
                                
                                ))
                            }
                            <Button onClick={()=>viewMoreTopics()}>View more</Button>
                        </div>
                    </div>
                    ):(<></>)}

            {otherForumUser?
            (
                    <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                        <div>
                            <h3>{otherForumUser.firstName} {otherForumUser.lastName}</h3>
                            <h4>{otherForumUser.emailAddress}</h4>
                            <h5>{moment(otherForumUser.dateOfBirth).tz(userTimeZone).format('DD-MM-YYYY')}</h5>
                            {
                                !isFriend? !requestSent?<Button onClick={()=>sendFriendRequest()}>Add Friend</Button>:<Button>Cancel Request</Button>: <></>
                            }   
                        </div>
                        <div style={{ float: 'right', display: 'block' }}>
                            Friends: {otherForumUser.friends.length}
                            <div>Recent Activity:</div>
                            <div>
                            {
                                recentTopics.map((topic)=>(
                                    <div key={topic.id}>Posted a topic with title: {topic.title} on {topic.category}</div>
                            ))
                            }
                            <Button onClick={()=>{
                                setPageTopic(0)
                                setShowAllHistory(true)}}>View all topics</Button>
                            </div>
                        </div>
                    </Container>
                    </Paper>
            ):
            <CircularProgress color="inherit" />
        }
        </div>
     );
}
 
export default ForumUserView;