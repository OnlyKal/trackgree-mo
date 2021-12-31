import React, {useState} from 'react'; 
 
export default function ArtAlert({text=null, setError}) {
   
    let [isShow, setIsShow] = useState(true);

    let Timer = 4000;
    let timer ;
    
    if(isShow || text){
        timer = setTimeout(()=>{
            setIsShow(false);
            clearTimeout(timer);
        },Timer); 
    }

    return (
        <>
            <div className={isShow?"art_alert_content show":'art_alert_content' } >
                <p className="art_layer_text">{text}</p>
            </div>
        </>
  
    )
}
