import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { Link } from "react-router-dom";
import { Paper, Container, CircularProgress, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import fetchCall from "../Services/FetchService";

const MyTopics = () => {
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [topics, setTopics] = useState(null)
    const [forumUser, setForumUser ] = useState(null)
    const [topicsWithLike, setTopicsWithLike ] = useState(null)

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

    const handleLike = (likedTopic, action)=>{
        fetchCall(`http://localhost:8080/topic/add-topic-like/${likedTopic.topicId}/${action}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 200){
                const updatedTopics = topicsWithLike.map((topic)=>
                    topic.topicId === likedTopic.topicId ? {...topic, isLiked: !likedTopic.isLiked}:topic
                )
                setTopicsWithLike(updatedTopics)
            }
        })
    }

    return ( 
        <div style={{ padding: '15vh' }}>
            { topicsWithLike? ( 
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
                                                <Button><ChatBubbleOutlineIcon/></Button>
                                                <Button><SendIcon/></Button>
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