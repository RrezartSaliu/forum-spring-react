import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { Paper, Container, Typography, Card, CardContent, Grid, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import { useLocalState } from '../Util/useLocalStorage';
import fetchCall from '../Services/FetchService';
import MessageWindow from './MessageWindow';

const TopicDisplay = ({ url }) => {
    const [ showMessageWindow, setShowMessageWindow ] = useState(false)
    const [ topicMessage, setTopicMessage ] = useState('')
    const [topicsWithLike, setTopicsWithLike ] = useState(null)
    const [ jwt, setJwt ] = useLocalState('','jwt')
    const [ forumUser, setForumUser ] = useState(null)
    const [ topics, setTopics ] = useState(null)

    useEffect(()=>{
        fetchCall(url, 'GET', jwt, null, 'return-response-json')
        .then((topics)=>{
            setTopics(topics)
            fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', jwt, null, 'return-response-json')
            .then((forumUser)=>{
                setForumUser(forumUser)
                fetchCall('http://localhost:8080/comment/get-comments', 'GET', jwt, null, 'return-response-json').then((comments)=>{
                const likedTopicIds = forumUser.likedTopics.map((topic)=>topic.topicId?topic.topicId:topic.id)
                const topicsWithLikeC = topics.map((topic)=>({
                    ...topic,
                    isLiked: topic.topicId?likedTopicIds.includes(topic.topicId):likedTopicIds.includes(topic.id),
                    commentsNum: comments.filter((comment)=> comment.topic.id === (topic.topicId?topic.topicId:topic.id)).length
                }))
                setTopicsWithLike(topicsWithLikeC)
            })
            })
        })
    },[url])

    const closeMessageWindow = () =>{
        setShowMessageWindow(false)
    }

    const handleLike = (likedTopic, action)=>{
        const topicId = likedTopic.topicId === undefined?likedTopic.id: likedTopic.topicId
        var calc = 0
        if(action === 'like'){
            calc++
        }
        if(action ==='unlike'){
            calc--
        }
        if (likedTopic.topicId !== undefined){
        fetchCall(`http://localhost:8080/topic/add-topic-like/${topicId}/${action}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 200){
                const updatedTopics = topicsWithLike.map((topic)=>
                    topic.topicId === likedTopic.topicId ? {...topic, isLiked: !likedTopic.isLiked, likes: likedTopic.likes+calc }:topic
                )
                setTopicsWithLike(updatedTopics)
            }
        })
        }
        else{
            fetchCall(`http://localhost:8080/topic/add-topic-like/${topicId}/${action}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 200){
                const updatedTopics = topicsWithLike.map((topic)=>
                    topic.id === likedTopic.id ? {...topic, isLiked: !likedTopic.isLiked, likes: likedTopic.likes+calc }:topic
                )
                setTopicsWithLike(updatedTopics)
            }
        })
        }
    }



    return ( 
        <>
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
                                        <Link to={`/topics/${topic.topicId?topic.topicId:topic.id}`} style={{ textDecoration: 'none'}}>
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
                                                {topic.commentsNum}
                                                <Button onClick={()=>{
                                                    setTopicMessage(topic.topicId?topic.topicId:topic.id)
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
        </>
     );
}
 
export default TopicDisplay;