import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import ListMessage from "./ListMessage";
import TypeMessage from "./TypeMessage";

function Chat(props) {
  let socket;
  const ENDPOINT = "http://localhost:3001";
  const [messages, setMessages] = useState([]);
  // const user = useSelector((state) => state.user.user);
  const user ={
    fullName:'Admin'
  }
  const idConversation = useSelector((state) => state.chat.idConversation);
  const nameConversation = useSelector(state => state.chat.nameConversation)

  useEffect(() => {
    if (!idConversation) return;
    const getAllMessageByConversation = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/chat/message?idConversation=${idConversation}`
      );
      setMessages(data.messageList);
    };

    getAllMessageByConversation();
  }, [idConversation]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("admin_join_conversation", idConversation);

    socket.on("newMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => socket.disconnect();
  });

  useEffect(() => {
    const scrollMessage = () => {
      var element = document.querySelector(".ad-chatuser-listmessage");
      if(element)
        element.scrollTop = element.scrollHeight;
    }
    
      scrollMessage()

  })

  const handleFormSubmit = async (message) => {
    const sender = user.fullName;

    const payload = {
      sender,
      message,
      idConversation,
    };
    const { data } = await axios.post(
      "http://localhost:3001/api/chat/save",
      payload
    );
    socket.emit('chat', data);
  };


  return (
   
<div className="ad-chatuser">
  {idConversation ? (
    <>
      <div className="ad-chatuser-user">
        <span className="ad-chatuser-user-name">{nameConversation}</span>
      </div>

      {messages ? (
        <ListMessage messages={messages} user={user}></ListMessage>
      ) : (
        ""
      )}

      <TypeMessage onSubmit={handleFormSubmit}></TypeMessage>
    </>
  ):
  (
    <div className="choose-user-message">Hãy chọn người dùng để chat</div>
  ) }
</div>
      
   
  );
}

export default Chat;
