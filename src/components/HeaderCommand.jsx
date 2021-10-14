import React from 'react'
import { ReactComponent as Back } from '../assets/images/back.svg';
import Button from './Button.jsx';

function HeaderCommand({navigator, }) {
 
    return (
        <>
            <div className="art_option">
                <Button onClick={()=>{navigator('home')}} className="art_null art_back_btn" children={<Back />} />
            </div>
            <div className="art_option">
                <h4>{"Command"}</h4>
            </div>
        </>
    )
}


export default HeaderCommand;
