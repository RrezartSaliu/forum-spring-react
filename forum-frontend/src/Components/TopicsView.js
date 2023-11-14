import { useLocalState } from "../Util/useLocalStorage";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { CircularProgress, Paper, Container, Typography, Accordion, AccordionDetails, AccordionSummary, Button  } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import fetchCall from "../Services/FetchService";



const TopicsView = () => {

    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ topic, setTopic ] = useState(null)
    const [ forumUser, setForumUser] = useState(null)
    const [ commentValue, setCommentValue] = useState('')
    const [ comments, setComments ] = useState(null)
    const [ replyValue, setReplyValue ] = useState([])

    const handleComment = (e) =>{
        e.preventDefault()

        if (!(commentValue.trim()==='')){
        const topicId = window.location.href.split('/topics/')[1]
        const commentReqBody = commentValue
        const topicReqId = topicId   
        setCommentValue('')

        fetchCall('http://localhost:8080/comment/create', 'POST', jwt, {commentReqBody, topicReqId})
        .then((response)=>{
            fetchCall(`http://localhost:8080/comment/get-comments-for-topic/${topicId}`, 'GET', jwt, null, 'return-response-json')
            .then((comments)=>{
                const pushArray = []
                comments.map((comment)=>{
                    pushArray.push({id: comment.id, value: ''})
                })
                setComments(comments)
                setReplyValue(pushArray)
            })
        })
        }
    }

    const handleReplyInputChange = (commentId, valueR) => {
        setReplyValue((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, value: valueR } : comment
          )
    );
    }
    const addReply = (e, replyObj) => { 
        e.preventDefault()
        if (!(replyObj.value.trim()==='')){
        const topicId = window.location.href.split('/topics/')[1]
        const replyReqBody = replyObj.value
        const commentId = replyObj.id   
        setReplyValue((prevComments) =>
          prevComments.map((comment) =>
            comment.id === replyObj.id ? { ...comment, value: '' } : comment
          ))

        fetchCall('http://localhost:8080/comment/create-reply', 'POST', jwt, {replyReqBody, commentId})
        .then((response)=>{
            fetchCall(`http://localhost:8080/comment/get-comments-for-topic/${topicId}`, 'GET', jwt, null, 'return-response-json')
            .then((comments)=>{
                setComments(comments)
            })
        })
    }
    }

    useEffect(()=>{
        const topicId = window.location.href.split('/topics/')[1]
        fetchCall(`http://localhost:8080/topic/${topicId}`, 'GET', jwt, null, 'return-response-json')
        .then((topic)=>{
            setTopic(topic)
        })
        fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', jwt, null, 'return-response-json')
        .then((forumUser)=>{
            setForumUser(forumUser)
            
        })

        fetchCall(`http://localhost:8080/comment/get-comments-for-topic/${topicId}`, 'GET', jwt, null, 'return-response-json')
        .then((comments)=>{
            const pushArray = []
            comments.map((comment)=>{
                pushArray.push({id: comment.id, value: ''})
            })
            setComments(comments)
            setReplyValue(pushArray)
        })
    },[])


    const handleLike = (action)=>{
        fetchCall(`http://localhost:8080/topic/add-topic-like/${topic.topicId}/${action}`, 'GET', jwt)
        .then((response)=>{
            if(response.status === 200){
                fetchCall(`http://localhost:8080/topic/${topic.topicId}`, 'GET', jwt, null, 'return-response-json')
                .then((topic)=>{
                    setTopic(topic)
                }).then(fetchCall('http://localhost:8080/ForumUser/my-profile', 'GET', jwt, null, 'return-response-json')
                .then((forumUser)=>{
                    setForumUser(forumUser)   
                }))
            }
        })
    }

    return ( 
        <div style={{ padding: '10vh' }}>
            {topic && forumUser && comments?
            (<div>
                <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc'}}>
                        <div>
                            <h1>{topic.title}</h1>
                            <p>{topic.body}</p>
                            <p>by <Link to={`/forum-user/${topic.author.fUserId}`}>{topic.author.firstName}   {topic.author.lastName}</Link></p>
                            {
                                forumUser.fUserId === topic.author.fUserId?<Link to={`/edit-topic/${topic.topicId}`}>Edit Topic</Link>:<></>
                            }
                        </div>
                        { forumUser.likedTopics.map((topic)=>(topic.id)).includes(topic.topicId)?<Button onClick={()=>{handleLike('unlike')}}><FavoriteIcon/></Button>:<Button onClick={()=>{handleLike('like')}}><FavoriteBorderIcon/></Button> }
                        { topic.likes }
                    </Container>
                </Paper>
                
                <Paper variant='outlined' style={{ marginTop: '1vh', border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                    <Container style={{ backgroundColor:'#f1f8fc'}}>
                        { comments.map((comment)=>(
                        <Accordion key={comment.id}>
                            <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <p>{comment.commentBody}</p>
                            <p> --- by <Link to={`/forum-user/${comment.author.id}`}>{comment.author.firstName} {comment.author.lastName}</Link></p>
                            </AccordionSummary>
                            {
                                comment.comments.map((reply)=>(
                                <AccordionDetails key={reply.id}> 
                                <Typography>
                                    {reply.commentBody}
                                </Typography>
                                </AccordionDetails>
                                    ))
                            }
                            <form onSubmit={(e)=>addReply(e, {id: comment.id, value: replyValue.find((reply)=>(comment.id === reply.id)).value })}>
                                <input type="text" value={replyValue.find((reply)=> (comment.id === reply.id)).value} onChange={(e)=>handleReplyInputChange(comment.id, e.target.value)}></input>
                                <button type="submit">add reply</button>
                            </form>
                        </Accordion>
                        ))
                        }   
                        <form onSubmit={(e)=>handleComment(e)}>
                            <input type="text" value={commentValue} onChange={(e)=>setCommentValue(e.target.value)}></input>
                            <button type="submit">add comment</button>
                        </form>
                    </Container>
                </Paper>
            </div>
            ):
            <CircularProgress color="inherit" />
        }
        </div>
     );
}
 
export default TopicsView;