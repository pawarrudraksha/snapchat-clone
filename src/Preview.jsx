import { useDispatch, useSelector } from "react-redux"
import "./Preview.css";
import {resetCameraImage, selectCameraImage} from "./features/cameraSlice.js"
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AttachFile, CloseOutlined, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import { db, storage} from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { selectUser } from "./features/appSlice.js";

export default function Preview() {
  const user=useSelector(selectUser)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!cameraImage){
      navigate("/")
    }
  },[])
  const cameraImage=useSelector(selectCameraImage)
  const closePreview=()=>{
    dispatch(resetCameraImage())
    navigate("/")
  }
  const sendPost=async()=>{
    try {
      
      const id=uuid()
      const storageRef = ref(storage, `posts/${id}`);
      await uploadString(storageRef, cameraImage, 'data_url')
      const downloadURL=await getDownloadURL(storageRef)
    await setDoc(doc(db, 'posts', id), {
      imageUrl:downloadURL,
      username:"Rudra",
      read:false,
      profilePic:user.profilePic,
      timestamp:serverTimestamp() 
    }); 
    navigate("/chats")
    } catch (error) {
      console.log(error);    
    }
  }
  return (
    <div className="preview">
      <CloseOutlined className="preview__close" onClick={closePreview}/>
      <div className="preview__toolbarRight">
        <TextFields/>
        <Create/>
        <Note/>
        <MusicNote/>
        <AttachFile/>
        <Crop/>
        <Timer/>
      </div>
      <img src={cameraImage}/>
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send className="preview__sendIcon"/>
      </div>

    </div>
  )
}
