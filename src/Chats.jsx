import React, { useEffect, useState } from 'react'
import "./Chats.css"
import { Avatar } from '@material-ui/core'
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons'
import { auth, db } from './firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage } from './features/cameraSlice'

export default function Chats() {
  const user=useSelector(selectUser)
  const [posts,setPosts]=useState([])  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("timestamp", "desc")));
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({
        id: doc.id,
        data: doc.data()
      });
    });
    setPosts(fetchedPosts);
  }
    useEffect(() => {
        fetchPosts()
    }, [])
    const takeSnap=async()=>{
      dispatch(resetCameraImage())
      navigate("/")
    }
    return (
    <div className='chats'>
        <div className='chats__header'>
            <Avatar src={user.profilePic} onClick={()=>{
              auth.signOut()
              navigate(0)
            }
            } className='chats__avatar'/>
            <div className='chats__search'>
                <Search className='chats__searchIcon'/>
                <input type='text' placeholder='Friends'/>
            </div>
            <ChatBubble className='chats__chatIcon'/>
        </div>
        <div className='chat__posts'>
            {
                posts?.map(({id,data:{profilePic,username,timestamp,imageUrl,read}})=>(
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))
            }
        </div>
        <RadioButtonUnchecked
          className='chats__takePicIcon'
          onClick={takeSnap}
          fontSize='large'
        />
    </div>
  )
}
