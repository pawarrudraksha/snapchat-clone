import "./Login.css"
import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { login } from "./features/appSlice"

function Login() {
    const dispatch=useDispatch()
    const signIn=async()=>{
        try {
            
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            dispatch(login({
                username:result.user.displayName,
                profilePic:result.user.photoURL,
                id:result.user.id
            }))
        } catch (error) {
            console.log(error);   
        }
    }
    return (
        <div className="login"> 
            <div className="login__container">
                <img src='https:scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt='logo'/>
                <Button variant='outlined' onClick={signIn}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login