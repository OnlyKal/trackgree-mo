import React from 'react'; 
import Loader_img from '../assets/images/hug.gif';
/**
 * 
 * @param {object} props The text to display in the loader
 * @returns html element
 */
export default function Loader({text='', dismiss=null}) {
    return (
        <div className="art_layer_container" onClick={()=>{
            if(dismiss) dismiss();
        }}>
            <div className="art_layer_content">
                {text.toLowerCase().includes('...') && <img src={Loader_img} alt="Loader gif" />}
                {text?<p className="art_layer_text">{text}</p>:null}
            </div>
        </div>
    )
}
