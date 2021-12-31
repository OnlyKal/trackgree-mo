import React from 'react'
import {Search} from 'react-feather';
import {ReactComponent as User} from '../assets/images/user_circle.svg';

import Button from './Button.jsx';

export default function HeaderDevices({navigator, }) {
    let currentUser = JSON.parse(localStorage.getItem('user'));


    const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
    if (selectedUser !== null) {
        currentUser = selectedUser;
    }
    return (
        <>
            <div className="art_option">
                <Button onClick={()=>{navigator('search')}} className="art_null art_seach_btn" children={<Search />} />
            </div>
            <div className="art_option">
                <h4>{currentUser.account_name.trim()===''?currentUser.username.toUpperCase():currentUser.account_name.toUpperCase()}</h4>
            </div>
            <div className="art_option">
                <Button onClick={()=>{
                    navigator('Accounts');
                }} className="art_null art_edit_btn" children={<User />} />
            </div>
        </>
    )
}
