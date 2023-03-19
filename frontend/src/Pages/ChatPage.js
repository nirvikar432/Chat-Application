




// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const ChatPage = () => {
// const [chats, setChats] = useState([]);

//     const fetchChats = async() => {
//         const { data } = await axios.get("/api/chat");

//         setChats(data);
//     };

//     useEffect(() => {
//         fetchChats();
//     }, []);

//   return (
//     <div>
//         { chats.map(chat => (
//             <div key = {chat._id}>{ chat.chatName}</div>                //fetching data from backend and display it on UI
//         )) }
//     </div>
//   )
// }



// export default ChatPage