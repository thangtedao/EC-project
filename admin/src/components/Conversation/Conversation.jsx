import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({data, currentUserId}) => {


    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)
        console.log(userId)
        const getUserData = async ()=>{
            try {
                const {data} = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    },[currentUserId, data])
    // console.log(userData.user.fullName)
return (
    <>
        <div className="follower conversation">
            <div>
                <div className='online-dot'></div>
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
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
    );
};

export default Conversation