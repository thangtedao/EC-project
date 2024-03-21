import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
// import Header from '../../components/Header'
import {io} from 'socket.io-client'

const Chat = () => {

  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
//     const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;
//     console.log(user)
const user = useSelector((state) => state.user.user);
console.log(user)
// Lấy thông tin người dùng từ localStorage
// var userData = localStorage.getItem('userInfo');
// var user = JSON.parse(userData);
// console.log(user._id);

// Use Socket.io
const socket = useRef()


// console.log(user)
useEffect(() => {
  socket.current = io("ws://localhost:8800");
  socket.current.emit("new-user-add", user._id);
  socket.current.on("get-users", (users) => {
    setOnlineUsers(users);
  });
}, [user]);

//send message to socket server
useEffect(() => {
  if (sendMessage!==null) {
    socket.current.emit("send-message", sendMessage);}
}, [sendMessage]);

//receiver from socket server
useEffect(() => {
  socket.current.on("recieve-message", (data) => {
    console.log(data)
    setReceivedMessage(data);
  }

  );
}, []);

//////////////////
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getChats = async () => {
          try {
            const { data } = await userChats(user._id);
            setChats(data);
            // console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
        getChats();
      }, [user._id]);
  return (
    <div className="Chat">

      {/* Leftside */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                //   online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RightSide */}

      <div className="Right-side-chat">
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage= {setSendMessage}  receivedMessage={receivedMessage}/>
      </div>
    </div>
  );
};

export default Chat;
