import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocalState } from "../Util/useLocalStorage"
import { Button, TextField, Box, Container, Paper } from "@mui/material"
import fetchCall from "../Services/FetchService"

const EditTopicView = () => {
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [topic, setTopic ] = useState(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [id, setId] = useState('')
    const navigate = useNavigate()
    const { topicId } = useParams


    useEffect(()=>{
        fetchCall(`http://localhost:8080/topic/${topicId}`, 'GET', jwt, null, 'return-response-json')
        .then((topic)=>{
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
        fetchCall('http://localhost:8080/topic/edit-topic', 'POST', jwt, updateReq)
        .then((response)=>{
            if(response.status === 200){
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