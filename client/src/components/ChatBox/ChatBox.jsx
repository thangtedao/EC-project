import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { addMessage, getMessages } from '../../api/MessagesRequest';
import "./ChatBox.css"
// import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'

const ChatBox = ({chat, currentUser,setSendMessage, receivedMessage}) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef()
    //fetch chat
    useEffect(()=>{
        const userId = chat?.members?.find((id)=>id!==currentUser)
        const getUserData = async ()=>{
            try {
                const {data} = await getUser(userId)
                setUserData(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(chat!==null) getUserData()
    },[chat, currentUser])

    //fetch messages
      // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

//   const handleChange=()=>{
//     //   console.log(newMessage)
//     setNewMessage(newMessage)
//   }

  const handleSend = async(e) =>{
    e.preventDefault()
    if(!newMessage){
        return
    }

    const message = {
        senderId: currentUser,
        text: newMessage,
        chatId:chat._id
    }
      //send message to socket io
    const receiverId = chat?.members?.find((id)=>id!==currentUser)
    setSendMessage({...message, receiverId})
    try {
        const {data} = await addMessage(message)
        setMessages([...messages, data])
        setNewMessage('')
    } catch (error) {
        
    }
  }



  // Receive Message from parent component
    useEffect(()=> {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
        }
    
    },[receivedMessage])

      // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  return (
    <div className='ChatBox-container'>
        {chat? (
        <>

            {/* Header chatbox */}
         <div className="chat-headert">
            <div className='follower'>
                <div>
                    {/* <div className='online-dot'></div> */}
                    <img
                    src="./images/user.png"
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{fontSize: '0.8rem'}}>
                        <span>{userData?.user.fullName}</span>
                        <span>Online</span>
                        {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
                    </div>
                </div>
            </div>
            <hr style={{width: "95%",border: "0.1px solid  rgb(98, 97, 97)",marginTop: "20px"}}/>
        </div>

        {/* Message Chatbox */}
        <div className='chat-body'>
            {
                messages.map((message)=>(
                        <div ref={scroll} className={message.senderId === currentUser? "message own":"message"} key={message._id} >
                            <span> {message.text}</span>
                            {/* <span> {format(message.createdAt)}</span> */}
                            <span> {message.createdAt}</span>
                        </div>
                ))
            }
        </div>

        {/* chat sender  */}

        <div className='chat-sender'>
            <div>+</div>
            <InputEmoji
                value = {newMessage}
                // onChange={handleChange}
                onChange={e=>(setNewMessage(e))}
            />
            <div className='send-button button' onClick={handleSend}>Send</div>
        </div>
        </>
        ):(
            <span className='chatbox-empty-message'>Tap to start a chat...</span>
        )
        }
        

    </div>
  )
}

export default ChatBox