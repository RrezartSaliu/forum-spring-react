import { useLocalState } from "../Util/useLocalStorage";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { CircularProgress, Paper, Container, Typography, Accordion, AccordionDetails, AccordionSummary, Button  } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";


const TopicsView = () => {

    const [ jwt, setJwt ] = useLocalState('', 'jwt')
    const [ topic, setTopic ] = useState(null)
    const [ forumUser, setForumUser] = useState(null)
    const [ commentValue, setCommentValue] = useState('')
    const [ comments, setComments ] = useState(null)

    const handleComment = (e) =>{
        e.preventDefault()

        const topicId = window.location.href.split('/topics/')[1]
        const commentReqBody = commentValue
        const topicReqId = topicId   
        setCommentValue('')
        fetch('http://localhost:8080/comment/create',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: 'POST',
            body: JSON.stringify({commentReqBody, topicReqId})
        }).then((response)=>{
            fetch(`http://localhost:8080/comment/get-comments-for-topic/${topicId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        }).then((response)=>{
            if(response.status === 200)
                return response.json()
        }).then((comments)=>{
            setComments(comments)
        })
        })
    }

    const handleReply = () => {
        
    }

    useEffect(()=>{
        const topicId = window.location.href.split('/topics/')[1]
        fetch(`http://localhost:8080/topic/${topicId}`,{
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        }
        }).then((response)=>{
            if(response.status === 200)
                return response.json()
        }).then((topic)=>{
            console.log(topic);
            setTopic(topic)
        })
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
        })

        fetch(`http://localhost:8080/comment/get-comments-for-topic/${topicId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        }).then((response)=>{
            if(response.status === 200)
                return response.json()
        }).then((comments)=>{
            setComments(comments)
        })
    },[])


    return ( 
        <div style={{ padding: '15vh' }}>
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
                            <p> --- by <Link to={`/forum-user/${comment.author.id}`}>{comment.author.firstName}   {comment.author.lastName}</Link></p>
                            </AccordionSummary>
                            {
                                comment.comments.map((reply)=>(
                                <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                                </AccordionDetails>
                                    ))
                            }
                            <form onSubmit={handleReply}>
                                <input type="text" value={commentValue} onChange={(e)=>setCommentValue(e.target.value)}></input>
                                <button type="submit">add reply</button>
                            </form>
                        </Accordion>
                        ))
                        }   
                        <form onSubmit={handleComment}>
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