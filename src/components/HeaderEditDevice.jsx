import React from 'react';
import { ReactComponent as Back } from '../assets/images/back.svg';
import Button from './Button.jsx';

function HeaderEditDevice({navigator,setShowBottomBar, name="Edit Device", back='deviceDetails', setSelectedUser, className='', beforeBack }) {
  return (
    <>
    <div className="art_option">
        <Button onClick={()=> {
          if (typeof beforeBack === 'function') {
            beforeBack(back);
          }
          
          if (typeof setShowBottomBar === 'function') { setShowBottomBar(true); }
          if (typeof setSelectedUser === 'function') { 
            // current login user
            // get user in localStorage
            setSelectedUser(JSON.parse(localStorage.getItem('user')));
          }
          navigator(back)
          }} className="art_null art_back_btn" children={<Back />} />
    </div>

   
    <div className={"art_option "+className}>
    <h4>{name}</h4>
    </div>
</>
  );
}

export default HeaderEditDevice;
