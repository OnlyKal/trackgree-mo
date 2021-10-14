import React ,{ Fragment } from 'react';
import {ReactComponent as DefaultIcon } from '../assets/images/car.svg';
import {ReactComponent as HDots } from '../assets/images/h-dots.svg';
import Button from './Button.jsx';
const handleShowDetails = (e, product,setviewDevice, navigator) => {
    setviewDevice(product);
    navigator('deviceDetails');
};


// const handleRemotePowerControl = (e, product,setviewDevice, navigator) => {
// };
const handleSetGroup = (e, product,setSelectedGroupDevice, setShowGroups) => {
    setSelectedGroupDevice(product);
    setShowGroups(true);
};
const handleSendCommand = (e, product,setviewDevice, navigator) => {
    setviewDevice(product);
    navigator('command');
};

function handleStatusUp(status,product) {
    if(product.speed > 0 && product.status === "moving" && product.loc_valid >0) {
        return product.speed+' km/h'
    }
    if(product.speed < 1 && status !== "nodata" && product.loc_valid < 1) {
        return "Weak Signal"
    }
    
    return product.statusTime.split(' ')[0]+" "+product.statusTime.split(' ')[1] 
}
function handleStatus(status, product) {
    if(product.speed > 0 && product.status === "moving" && product.loc_valid >0) {
        return product.status
    }else {
        if(product.speed < 1 && status !== "nodata" && product.loc_valid < 1) {
            return "nosignal"
        }
    }
    
    return status
}


export default function ProductList({status, product={}, showMenu,menuElements, setviewDevice, navigator, setShowGroups, setSelectedGroupDevice,  setCurrentMapDevice}) {

    let _menuElements = [
        {   product,
            name: 'Details',
            handleClick:(e, product)=> handleShowDetails(e, product,setviewDevice, navigator),
        },
        // {   product,
        //     name: "Move Device",
        //     handleClick:(e, product)=> handleSendCommand(e, product,setviewDevice, navigator),
        // },
        // {   product,
        //     name: ((typeof product["params"] !== 'string' && 'pwrcut' in product["params"] && Number(product['params']['pwrcut']) >0) ? 'Restore fuel' : 'Remote cut off'),
        //     handleClick:(e, product)=> handleRemotePowerControl(e, product,setviewDevice, navigator),
        // },
        {   product,
            name: 'Set Group',
            handleClick:(e, product)=> handleSetGroup(e, product,setSelectedGroupDevice, setShowGroups),
        },
        {   product,
            name: 'Command',
            handleClick:(e, product)=> handleSendCommand(e, product,setviewDevice, navigator),
        },
    ];
    
    const handlePClick = (e, product) => {
        if( product ){
            setCurrentMapDevice("search?q="+product.imei);
            navigator('map');
            
        }
    };
    
    return (
        <div className={status?"art_product_co "+ handleStatus(status, product).split(' ').join('') :"art_product_co"}>
            <div className="art_product_icon" onClick={(status !== "nodata"&&/* handleStatus(status,product) !== "nosignal" &&  */status !== "static")?(e)=>handlePClick(e, product):null}>
                <DefaultIcon />
            </div>
            <div className="art_product_details_co">
                <div className="art_product_details" onClick={(status !== "nodata"&&/* handleStatus(status,product) !== "nosignal" &&  */status !== "static")?(e)=>handlePClick(e, product):null}>
                    <div className="art_sec"><h3 className="art_product_name">
                        {product.name.split(' ').map((e, i)=>{
                            if(i<product.name.split(' ').length-1) {
                                return  <Fragment key={i}>{e}&nbsp;</Fragment>
                            }
                            return e
                        })}
                        </h3>
                        <p className="art_product_id">{product.imei}</p>
                    </div>
                    <div className="art_sec">
                         { (status !== "nodata" && status !== "static") ? <h3 className="art_product_indicator">{handleStatusUp(status,product)}</h3> : ''}
                        <p className="art_product_status">{handleStatus(status, product).split(' ').join('').toUpperCase()}</p>
                    </div>
                    
                </div>
                {(status !== "nodata"&&/* handleStatus(status,product) !== "nosignal" &&  */status !== "static") ? <Button className="art_menu art_product_option" onClick={()=>{showMenu(true);menuElements(_menuElements)}}  children={<HDots />} />: ''}
                
              
            </div>
        </div>
    )
}

