import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider"
import { useState } from "react";

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>

    );
};

export default ChatPage


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const ChatPage = () => {
//     const [chats, setChats] = useState([]);

//     const fetchChats = async () => {
//         const { data } = await axios.get("/api/chat");

//         setChats(data);
//     };

//     useEffect(() => {
//         fetchChats();
//     }, []);

//     return (
//         <div>
//             {chats.map(chat => (
//                 <div key={chat._id}>{chat.chatName}</div>                //fetching data from backend and display it on UI
//             ))}
//         </div>
//     )
// }



// export default ChatPage