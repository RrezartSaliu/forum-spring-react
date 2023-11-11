import  { Button, TextField, Container, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAdress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const navigate = useNavigate()

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const isMatching = password === confirmPassword;

    const handleSignup = (event) => {
        event.preventDefault()
        const forumUser = { firstName, lastName, emailAddress, password, dateOfBirth }

        fetch('http://localhost:8080/ForumUser/add',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(forumUser)
        }).then(()=>{
            navigate('/login')
        })
        
    }

    return ( 
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <Container>
            <form onSubmit={handleSignup}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <TextField required label="First Name" value={firstName} variant="outlined" margin="normal" style={{ width: '350px' }} onChange={(e)=>setFirstName(e.target.value)}/>
                    <TextField required label="Last Name" value={lastName} variant="outlined" margin="normal" style={{ width: '350px' }} onChange={(e)=>setLastName(e.target.value)}/>
                    <TextField required label="Email" value={emailAddress} variant="outlined" margin="normal" style={{ width: '350px' }} onChange={(e)=>setEmailAdress(e.target.value)}/>
                    <TextField 
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ width: '350px' }}
                    />
                    <TextField 
                        required
                        id="outlined-confirmed-password-input"
                        label="Confirm Password"
                        type="password"
                        margin="normal" 
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{ width: '350px' }}
                        error={!isMatching} 
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div margin="normal" style={{ width: '350px', margin: '2vh'}}>
                            <DatePicker value={dateOfBirth} onChange={(e)=>setDateOfBirth(e)} format='DD/MM/YYYY' slotProps={{ textField: { fullWidth: true } }}/>
                        </div>
                    </LocalizationProvider>
                    <Button type="submit" variant="contained" style={{ width: '185px', background: '#506c69', marginTop:'10px' }}>
                    Sign Up
                    </Button>
                </Box>
            </form>
        </Container>
    </Box>
    );
}
 
export default Signup;