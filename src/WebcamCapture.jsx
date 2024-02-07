import "./WebcamCapture.css"
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { RadioButtonUnchecked } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { setCameraImage } from './features/cameraSlice'
import { useNavigate } from 'react-router-dom'

const videoConstraints={
    width:250,
    height:400,
    facingMode:"user"
}
export default function WebcamCapture() {
  const webcamRef=useRef(null)  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const capture=useCallback(()=>{
    const imageSrc=webcamRef.current.getScreenshot();  
    dispatch(setCameraImage(imageSrc))
    navigate("/preview")
  },[webcamRef])
  return (
    <div className='webcamCapture'>
        <Webcam
            audio={false}
            height={videoConstraints.height}
            width={videoConstraints.width}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
        />
        <RadioButtonUnchecked
          className="webcamCapture__button"
          onClick={capture}
          fontSize="large"
        />
    </div>
  )
}
