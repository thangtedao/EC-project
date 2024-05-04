import React from "react";
import { getFirstCharacterUser } from "../../../utils/chat";
import "./ListConversation.css";
function ListConversation(props) {
  const { conversationList, onConversationClick } = props;
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + "...";
    } else {
      return str;
    }
  }
  return (
    <div className="contact-list">
      {conversationList.map((conversation) => (
        <div
          key={conversation._id}
          className={`contact-list-item ${conversation.seen ? "" : "unseen"}`}
          onClick={() => onConversationClick(conversation)}
        >
          <div className="contact-list-item-avarta">
            {getFirstCharacterUser(conversation.nameConversation)}
          </div>
          <div className="contact-list-item-content">
            <p className="contact-list-item-name">
              {conversation.nameConversation}
            </p>
            <span className="contact-list-item-lastmessage">
              {" "}
              {truncateString(conversation.lastMessage, 35)}{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListConversation;
