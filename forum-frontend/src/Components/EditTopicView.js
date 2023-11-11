import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useLocalState } from "../Util/useLocalStorage"
import { Button, TextField, Box, Container, Paper } from "@mui/material"

const EditTopicView = () => {
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [topic, setTopic ] = useState(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [id, setId] = useState('')
    const navigate = useNavigate()


    useEffect(()=>{
        const topicId = window.location.href.split('/edit-topic/')[1]
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
            setTitle(topic.title)
            setBody(topic.body)
            setId(topic.topicId)
        })
        }
    ,[])

    const handleUpdate = (e) =>{
        e.preventDefault()
        const updateReq = { id, title, body }
        fetch('http://localhost:8080/topic/edit-topic',{
            headers: {
                "Content-Type":  "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "POST",
            body: JSON.stringify(updateReq)
        }
        ).then((response)=>{
            if(response.status === 200){
                console.log("topic succesfylly edited");
                navigate('/my-topics')
            }
        })
    }

    return ( 
        <div style={{ padding: '20vh'}}>
            {
                topic ?(
                    <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                        <Container style={{ backgroundColor:'#f1f8fc'}}>
                            <form onSubmit={handleUpdate}>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <TextField value={title} onChange={(e)=>setTitle(e.target.value)} label="Title" variant="outlined" margin="normal" style={{ width: '350px'}}/>
                                    <TextField value={body} multiline onChange={(e)=>setBody(e.target.value)} label="Body" variant="outlined" margin="normal" style={{ width: '350px'}}/>
                                    <div>
                                        <Button type="submit">Save Changes</Button>
                                        <Link to='/my-profile'>Cancel</Link>
                                    </div>
                                </Box>
                            </form>
                        </Container>
                    </Paper>
                ):
                <div>Loading...</div>
            }
        </div>
     );
}
 
export default EditTopicView;