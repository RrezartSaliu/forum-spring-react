import { useEffect, useState } from "react";
import TopicDisplay from "./TopicDisplay";

const MyTopics = () => {
    useEffect(()=>{
        
    },[])

    return ( 
        <div style={{ padding: '10vh' }}>
            <TopicDisplay url={'http://localhost:8080/topic/user-topics'}/>
        </div>
    );
}
 
export default MyTopics;