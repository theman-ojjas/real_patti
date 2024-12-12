import React from 'react';
import './Entry.css'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getSocket } from './socket';


function Entry() {
  const navigate=useNavigate();

const [userName,setUserName]=useState("");


const enterUser=()=>{
  if(userName.trim()){
    const socket=getSocket();
    socket.emit("userName",userName);
    navigate('/Create_Join_Table');
  
  }
}
  return (
    <div className="body_block">
      <div className="left-image">
        <img src="/images/left_image.png" alt="Left Image" class="image" />
      </div>
      <div className="right-image">
        <img src="/images/right_image.png" alt="Right Image" class="image" />
      </div>

      <div className='player_profile_block'>
      <div class="avatar-selector">
         <button class="avatar-button">
              <img src="/images/avatar.png" alt="Player Avatar" class="avatar-image" />
         </button>
        </div>

        <div className='player_name'>
            <input type='text' id='player_name' placeholder='Enter your name' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>
        <button class="enter_button_class" onClick={enterUser}>
              <img src="/images/enter_button.png" alt="Enter Button" class="enter_button" />
         </button>

      </div>
    </div>
  );
}

export default Entry;
