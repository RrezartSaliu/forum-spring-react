import { Typography, Box } from '@mui/material'


const HomePage = () => {
    return ( 
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            >
            <div>
                <Typography variant="h4" component="h1" gutterBottom>
                    Thread Talk
                </Typography>
                <Typography variant="body1">
                    Bla bla
                </Typography>
            </div>
        </Box>
     );
}
 
export default HomePage;