import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { TextField, Box, Button, Container, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchCall from "../Services/FetchService";

const CreateTopic = () => {
    const [jwt, setJwt] = useLocalState('','jwt')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const navigate = useNavigate();
    const [ categories, setCategories ] = useState([])
    const [ category, setCategory ] = useState('')

    useEffect(()=>{
        fetchCall('http://localhost:8080/topic/get-categories', 'GET', jwt, null, 'return-response-json')
        .then((categories)=>setCategories(categories))
    },[])



    const handleTopic = (e) =>{
        e.preventDefault()
        const assignmentReq = { title, body, category }
        if(title.trim() !== '' && body.trim() !== '' && category.trim() !== '')
            fetchCall('http://localhost:8080/topic/create', 'POST', jwt, assignmentReq, 'return-response-json')
            .then((data)=>{
                navigate('/my-topics')
            })
    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

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
                            style={{ paddingBottom: '20px'}}
                        />
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                        </Select>
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