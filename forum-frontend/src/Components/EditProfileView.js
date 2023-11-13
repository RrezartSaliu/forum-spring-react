import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Paper, Box, TextField, Button } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import fetchCall from "../Services/FetchService";

const EditProfileView = () => {
    const [jwt, setJwt] = useLocalState('','jwt')
    const [forumUser, setForumUser] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [bio, setBio] = useState('')
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchCall('http://localhost:8080/ForumUser/my-profile', "GET", jwt, null, 'return-response-json')
        .then((forumUser)=>{
            console.log(forumUser);
            setFirstName(forumUser.firstName)
            setLastName(forumUser.lastName)
            setDateOfBirth(new Date (forumUser.dateOfBirth))
            setForumUser(forumUser)
            setBio(forumUser.bio)
        })
    },[])

    const handleUpdate = (e) =>{
        e.preventDefault()
        const updateReq = { firstName, lastName, dateOfBirth, bio  }
        fetchCall('http://localhost:8080/ForumUser/edit-profile', 'POST', jwt, updateReq)
        .then((response)=>{
            if(response.status === 200){
                console.log("profile succesfully updated");
                navigate('/my-profile')
            }
        })
    }

    return ( 
        <div style={{ padding: '20vh'}}>
            {
                forumUser?
                (   
                    <Paper variant='outlined' style={{ border: '3px solid #506c69', padding: '16px', backgroundColor:'#f1f8fc'}}>
                        <Container style={{ backgroundColor:'#f1f8fc'}}>
                            <form onSubmit={handleUpdate}>
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <TextField value={firstName} onChange={(e)=>setFirstName(e.target.value)} label="First Name" variant="outlined" margin="normal" style={{ width: '350px'}}/>
                                    <TextField value={lastName} onChange={(e)=>setLastName(e.target.value)} label="Last Name" variant="outlined" margin="normal" style={{ width: '350px'}}/>
                                    <TextField value={bio} multiline maxRows={4} onChange={(e)=>setBio(e.target.value)} label="Bio" variant="outlined" margin="normal" style={{ width: '350px'}}/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div margin="normal" style={{ width: '350px', margin: '2vh'}}>
                                            <DatePicker value={dayjs(dateOfBirth)} onChange={(e)=>setDateOfBirth(e)} format='DD/MM/YYYY' slotProps={{ textField: { fullWidth: true } }}/>
                                        </div>
                                    </LocalizationProvider>
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
 
export default EditProfileView;