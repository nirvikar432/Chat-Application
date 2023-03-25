import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import '../Components/styles.css'
import ScrollableChat from './ScrollableChat'


const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const toast = useToast();

    const { user, selectedChat, setSelectedChat } = ChatState()

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post("/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id,
                    },
                    config
                );
                // console.log(data)

                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);

            // socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    useEffect(() => {
        fetchMessages();

        // selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);



    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        width="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {/* {messages && */}
                        {(!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        ))}
                        <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="gray.200" width="98%"
                            height="85%"
                            borderRadius="lg"
                            overflowY="hidden"
                            position="absolute"
                            top="50%"
                            left="50%"
                            right="50%"
                            // inset="0"
                            transform="translate(-50%,-45%)"
                        // translateY="-50%"


                        >
                            {loading ? (
                                <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
                            ) : (
                                <div className="messages">
                                    <ScrollableChat messages={messages} />
                                </div>
                            )}
                            <FormControl onKeyDown={sendMessage} id="first-name" isRequired mt={3}>
                                <Input variant="filled" bg="#E0E0E0" placeholder="Enter a message.." value={newMessage}
                                    onChange={typingHandler} />
                            </FormControl>
                        </Box>
                    </Text>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}

        </>
    )
}

export default SingleChat