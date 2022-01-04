import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import React from "react";

export default function GetIMEIScannedBar({visibility,onUpdate}){
    let style={
        main:{
            display:{visibility},
            width:'200px',
            height:'200px',
            margin:'7px auto 7px auto',
            border:'solid 2px',
            borderColor:'rgba(210,210,208,255)',
            flexDirection:'Column',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'rgba(211,212,200,200)',
            borderRadius:'3px'
        },
    }
    return <div style={style.main} >
                  <BarcodeScannerComponent width={160} height={160} onUpdate={onUpdate}/>     
    </div>
}
