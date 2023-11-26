import { useEffect, useState } from "react";
import fetchCall from "../Services/FetchService";
import { useLocalState } from "../Util/useLocalStorage";
import { CircularProgress, Button, Typography, CardContent, Card, Grid, Container, Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import MessageWindow from "./MessageWindow";
import TopicDisplay from "./TopicDisplay";

const TopicsByCategory = () => {
    const { category } = useParams()
    const [ jwt, setJwt] = useLocalState('', 'jwt');
    const [ topics, setTopics ] = useState(null)
    const [ topicsWithLike, setTopicsWithLike ] = useState(null)
    const [ forumUser, setForumUser ] = useState(null)
    const [ alignment, setAlignment ] = useState(null)
    const [ url, setUrl ] = useState(`http://localhost:8080/topic/topics-by-category/${category}/`)

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setTopicsWithLike(null)
        if (newAlignment === null){
            setUrl(`http://localhost:8080/topic/topics-by-category/${category}`)
        }
        else{
            setUrl(`http://localhost:8080/topic/topics-by-category/${category}/${newAlignment}`)
        }
    };

    useEffect(()=>{
        setUrl(`http://localhost:8080/topic/topics-by-category/${category}/`)
    
    },[category])

    return ( 
        <div style={{ padding: '10vh' }}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="most-liked">Most likes</ToggleButton>
                <ToggleButton value="newest">Newest</ToggleButton>
                <ToggleButton value="oldest">Oldest</ToggleButton>
            </ToggleButtonGroup>
        <TopicDisplay url={url}/>
        </div>
     );
}
 
export default TopicsByCategory;