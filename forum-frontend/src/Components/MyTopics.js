import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { Link } from "react-router-dom";
import { Paper, Container, CircularProgress, Typography, Card, CardContent, Grid, Button, TextField } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import fetchCall from "../Services/FetchService";
import MessageWindow from "./MessageWindow";

const MyTopics = () => {
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [topics, setTopics] = useState(null)
    const [forumUser, setForumUser ] = useState(null)
    const [topicsWithLike, setTopicsWithLike ] = useState(null)
    const [ showMessageWindow, setShowMessageWindow ] = useState(false)
    const [ topicMessage, setTopicMessage ] = useState('')

    useEffect(()=>{
        fetchCall('http://localhost:8080/topic/user-topics', 'GET', jwt, null, 'return-response-json')
        .then((topics)=>{
            setTopics(topics)
            fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', jwt, null, 'return-response-json')
            .then((forumUser)=>{
                setForumUser(forumUser)
                const likedTopicIds = forumUser.likedTopics.map((topic)=>topic.id)
                const topicsWithLikeC = topics.map((topic)=>({
                    ...topic,
                    isLiked: likedTopicIds.includes(topic.topicId)
                }))
                setTopicsWithLike(topicsWithLikeC)
            })
        })
    },[])

    const closeMessageWindow = () =>{
        setShowMessageWindow(false)
    }


    const handleLike = (likedTopic, action)=>{
        var calc = 0
        if(action === 'like'){
            calc++
        }
        if(action ==='unlike'){
            calc--
        }
        fetchCall(`http://localhost:8080/topic/add-topic-like/${likedTopic.topicId}/${action}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 200){
                const updatedTopics = topicsWithLike.map((topic)=>
                    topic.topicId === likedTopic.topicId ? {...topic, isLiked: !likedTopic.isLiked, likes: likedTopic.likes+calc }:topic
                )
                setTopicsWithLike(updatedTopics)
            }
        })
    }

    return ( 
        <div style={{ padding: '10vh' }}>
            { showMessageWindow &&
            <MessageWindow forumUser={forumUser} closeMessageWindow={closeMessageWindow} topicId={topicMessage} />
            }   
            { 
            topicsWithLike? ( 
                <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc'}}>
                        <Grid container spacing={2}>
                            
                                { topicsWithLike.length !== 0 ? (topicsWithLike.map((topic)=>(
                                    <Grid key={topic.topicId} item xs={12} sm={6} md={4}>
                                    <Card style={{ height: '100%' }}>
                                      <CardContent style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
                                        <Link to={`/topics/${topic.topicId}`} style={{ textDecoration: 'none'}}>
                                            <Typography variant="h5">{topic.title}</Typography>
                                            <Typography style={{ wordWrap: 'break-word' }} >{topic.body}</Typography>
                                        </Link>
                                        <div style={{ marginTop: 'auto', paddingBottom: '3vh'}}>
                                            <Typography style={{ display: 'flex', justifyContent: 'space-between'}}>
                                                {
                                                    topic.isLiked?<Button onClick={()=>handleLike(topic,'unlike')}><FavoriteIcon/></Button>:<Button onClick={()=>handleLike(topic,'like')}><FavoriteBorderIcon/></Button>
                                                }
                                                {topic.likes}
                                                <Button><ChatBubbleOutlineIcon/></Button>
                                                <Button onClick={()=>{
                                                    setTopicMessage(topic.topicId)
                                                    setShowMessageWindow(true)}}><SendIcon/></Button>
                                            </Typography>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </Grid>))):<div>No posts yet</div>}
                        
                        </Grid>
                    </Container>
                </Paper>
            )
            :
            <CircularProgress color="inherit" />
        }
        </div>
    );
}
 
export default MyTopics;