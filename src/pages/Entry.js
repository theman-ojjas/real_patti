import React from 'react';
import './Entry.css'
import { useContext } from 'react';
import { Context } from '../helpers/Contexts';
function Entry() {

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
            <input type='text' id='player_name' placeholder='Enter your name'/>
        </div>
        <button class="enter_button_class" >
              <img src="/images/enter_button.png" alt="Enter Button" class="enter_button" />
         </button>

      </div>
    </div>
  );
}

export default Entry;
