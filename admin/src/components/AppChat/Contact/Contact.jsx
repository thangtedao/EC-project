import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversationList,
  showConversation,
  updateIdConversation,
  updateLastMessageConversation,
} from "../../../actions/chatAction";
import ListConversation from "./ListConversation";
import io from "socket.io-client";

function Contact(props) {
  let socket;
  const ENDPOINT = "localhost:3001";
  const dispatch = useDispatch();
  const conversationList = useSelector((state) => state.chat.conversationList);
  // const idConversation = useSelector(state => state.chat.idConversation)

  // if(conversationList){
  // }
  useEffect(() => {
    dispatch(getAllConversationList());
  }, []);

  // useEffect(() => {
  //     if(conversationList){
  //         dispatch(updateIdConversation(conversationList[0]))
  //     }
  // }, [conversationList])

  // useEffect(() => {
  //     dispatch(SeenConversation(idConversation))
  // }, [idConversation])

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("lastMessage", async (data) => {
      dispatch(updateLastMessageConversation(data));
      dispatch(getAllConversationList());
    });

    socket.on("show-me", (data) => {
      dispatch(showConversation(data));
    });

    return () => socket.disconnect();
  }, []);

  const onConversationClick = (conversation) => {
    dispatch(updateIdConversation(conversation));
    conversation.seen = true;
  };
  return (
    <div className="contact">
      {conversationList ? (
        <ListConversation
          conversationList={conversationList}
          onConversationClick={onConversationClick}
        ></ListConversation>
      ) : (
        ""
      )}
    </div>
  );
}

export default Contact;
