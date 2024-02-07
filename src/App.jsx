import './App.css';
import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import { Routes,Route, BrowserRouter} from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';


function App() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          username:authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid
        }))
      }
    })
  },[])
  return (
    <div className="app">
        <BrowserRouter>
          {!user ? <Login/>:(<>
            <img src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="logo" className='app__logo' />
          <div className='app__body'>
            <div className="app__bodyBackground">
              <Routes>
                <Route  path="/">
                  <Route index element={<WebcamCapture/>}/>
                </Route>
                <Route  path="/preview">
                  <Route index element={<Preview/>}/>
                </Route>
                <Route  path="/chats">
                  <Route index element={<Chats/>}/>
                </Route>
                <Route  path="/chats/view">
                  <Route index element={<ChatView/>}/>
                </Route>
              </Routes>
            </div>
          </div></>)
          }
        </BrowserRouter>
    </div>
  );
}

export default App;
