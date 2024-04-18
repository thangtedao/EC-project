import React from 'react';

function ListMessage(props) {
    const {messages, user} = props
    return (
        <div className="chatuser-listmessage">
            { 
                messages.map(message => (
                <div key={message._id} className={user.fullName === message.sender ? 'chatuser-listmessage-message me' : 'chatuser-listmessage-message'}>
                    <p>{message.message}</p>
                </div>))
            }
        </div>
    );
}

export default ListMessage;