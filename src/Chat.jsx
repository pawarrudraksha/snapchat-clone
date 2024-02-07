import { Avatar } from '@material-ui/core'
import { StopRounded } from '@material-ui/icons'
import React from 'react'
import "./Chat.css"
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from './features/appSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'

export default function Chat({id,profilePic,username,timestamp,imageUrl,read}) {
  const dispatch=useDispatch()  
  const navigate=useNavigate()
  const open=async()=>{
    try {
        
        if(!read){
            dispatch(selectImage(imageUrl))
            const docRef = doc(db, "posts", id);
            await updateDoc(docRef, {
                read: true
            });
            navigate("/chats/view")
        }
    } catch (error) {
        console.log(error);   
    }
  }  
  return (
    <div className='chat' onClick={open}>
        <Avatar src={profilePic} className='chat__avatar'/>
        <div className='chat__info'>
            <h4>{username}</h4>
            <p>{!read && "Tap to view -"} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read  && <StopRounded className='chat__readIcon'/>}
    </div>
  )
}
