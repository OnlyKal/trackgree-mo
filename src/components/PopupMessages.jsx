import React from "react";
import { useState } from "react";


const SuccessMessage=({message})=>{
    const [visibility,setVisibility]=useState('flex')
    setTimeout(()=>setVisibility('none'),3000)
    let style={
        display:`${visibility}`,
        flexDirection:'column',
        backgroundColor:'#D8FFD0',
        justifyContent:'center',
        margin:'0 26%',
        height:'53px',
        padding:'3px 20px',
        border:'solid 1px',
        borderColor:'#009924',
        borderRadius:'9px',
        boxShadow:'0 0 10px gray',
        position:'absolute'
    
    }
    return <div style={style} onClick={()=>setVisibility('none')}>
                    <a style={{color:'#009924',fontWeight:'bold'}}>Success</a>
                    <a style={{color:'#009924',fontSize:'13px'}}>{message}</a>
    </div>
}
const ErrorMessage=({message})=>{
    const [visibility,setVisibility]=useState('flex')
    setTimeout(()=>setVisibility('none'),3000)
    let style={
        display:`${visibility}`,
        flexDirection:'column',
        backgroundColor:'#FED0CE',
        justifyContent:'center',
        margin:'0 26%',
        height:'53px',
        padding:'3px 20px',
        border:'solid 1px',
        borderColor:'#991A0C',
        borderRadius:'9px',
        boxShadow:'0 0 10px gray',
        position:'absolute'
    }
    return <div style={style} onClick={()=>setVisibility('none')}>
                    <a style={{color:'#991A0C',fontWeight:'bold'}}>Error</a>
                    <a style={{color:'#991A0C',fontSize:'13px'}}>{message}</a>
    </div>
}


export {SuccessMessage,ErrorMessage}