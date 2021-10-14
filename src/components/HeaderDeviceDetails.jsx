import React from 'react'
import { ReactComponent as Back } from '../assets/images/back.svg';
import {ReactComponent as Edit } from '../assets/images/edit.svg';
import Button from './Button.jsx';

function HeaderDeviceDetails({navigator, }) {
 
    return (
        <>
            <div className="art_option">
                <Button onClick={()=>{
                    
                  // get previous page from sessionStorage
                  let previousPage = sessionStorage.getItem('previousPage');
                  previousPage = previousPage ? previousPage : 'search';
                  navigator(previousPage)
                    // navigator('home')
                }} className="art_null art_back_btn" children={<Back />} />
            </div>
            <div className="art_option">
                <h4>{"Device Details"}</h4>
            </div>
            <div className="art_option">
                <Button onClick={()=>{

                    navigator('editDevice');

                }} className="art_null art_edit_btn" children={<Edit />} />
            </div>
        </>
    )
}


export default HeaderDeviceDetails;
