import React from 'react'
import {ReactComponent as Logout } from '../assets/images/Logout.svg';
import Button from './Button.jsx';
import { logout } from './fetchProducts';
import {  useIndexedDB } from 'react-indexed-db';

function HeaderProfile({navigator, }) {


  const db = useIndexedDB('recents');
  
 

  return (
      <>
          <div className="art_option">
              <Button onClick={()=>{
                // clear Recents searches
                db.clear().then(() => {
                  // loggout
                  logout();
                });

              }} className="art_null art_profile_btn" beforeContent={<Logout />} afterContent={"Logout"} />
          </div>
      </>
  )
}


export default HeaderProfile;
