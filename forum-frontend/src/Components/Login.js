import  { Button, TextField, Container, Box } from '@mui/material';
import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../Util/useLocalStorage';
import fetchCall from '../Services/FetchService';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginRequest = { email, password }
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState('', 'jwt')


    const handleLogin= (e)=>{
        e.preventDefault()
        fetchCall('http://localhost:8080/ForumUser/login', 'POST', null, loginRequest)
        .then((response) => {
            if(response.status === 200)
                return Promise.all([response.json(), response.headers])
            else{
                alert('bad credentials')
                throw new Error("Try agains")
            }
        })
        .then(([body, headers])=>{
            setJwt(headers.get('authorization'))
        })
        .catch(
            (error)=>{
                console.error(error)
            }
        )
    }
    useEffect(()=>{
        if(jwt!==''){
            window.dispatchEvent(new Event('storage'))
            navigate('/')
        }
    },[jwt])


    return ( 
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh">
            <Container>
                <form onSubmit={handleLogin}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <TextField onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" variant="outlined" margin="normal" style={{ width: '350px' }} />
                        <TextField onChange={(e)=>setPassword(e.target.value)} value={password} label="Password" variant="outlined" type="password" margin="normal" style={{ width: '350px' }} />
                        <Button type="submit" variant="contained" style={{ width: '185px', background: '#506c69', marginTop:'10px' }}>
                        Login
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
     );
}
 
export default Login;