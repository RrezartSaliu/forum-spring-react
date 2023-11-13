import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { TextField, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchCall from "../Services/FetchService";

const CreateTopic = () => {
    const [jwt, setJwt] = useLocalState('','jwt')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        
    },[])

    const handleTopic = (e) =>{
        e.preventDefault()
        const assignmentReq = { title, body }
        fetchCall('http://localhost:8080/topic/create', 'POST', jwt, assignmentReq, 'return-response-json')
        .then((data)=>{
            console.log(data)
            navigate('/my-topics')
        })
    }
    return ( 
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh">
            <Container>
                <form onSubmit={handleTopic}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <TextField onChange={(e)=>setTitle(e.target.value)} value={title} label="Title" variant="outlined" margin="normal" style={{ width: '350px' }} />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Body"
                            multiline
                            maxRows={6}
                            onChange={(e)=>setBody(e.target.value)}
                            value={body}
                        />
                        <Button type="submit" variant="contained" style={{ width: '185px', background: '#506c69', marginTop:'10px' }}>
                        Login
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
     );
}
 
export default CreateTopic;