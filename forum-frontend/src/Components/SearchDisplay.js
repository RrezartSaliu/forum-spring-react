import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicDisplay from "./TopicDisplay";

const SearchDisplay = () => {
    const { searchValue } = useParams()

    useEffect(()=>{
        
    },[])

    return ( 
        <div style={{ padding: '10vh' }}>
            <TopicDisplay url={`http://localhost:8080/topic/search?searchValue=${searchValue}`}/>
        </div>
     );
}
 
export default SearchDisplay;