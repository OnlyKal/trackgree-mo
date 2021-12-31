import React from 'react';
import Header from './Header.jsx'

import {handleSearch} from './fetchProducts'
import HeaderEditDevice from './HeaderEditDevice.jsx';
import  Button  from './Button.jsx';
import { X } from 'react-feather';
import axios from 'axios';
import { API } from '../config/index.js';
import Loader from "./Loader.jsx";

function EditDevice({navigator, search, setSearchKeyword,setviewDevice,device,setShowBottomBar }) {
    
let inputData = [
    {
        name: 'Device Name',
        value: device.name,
        ref: React.useRef(),
        type: 'text',

    },
    {
        name: 'Plate No.',
        value: device.plate_number,
        edit: true,
        ref: React.useRef(),
        type: 'text',
    },
    {
        name: 'SIM',
        value: device.sim_number,
        edit: true,
        ref: React.useRef(),
        type: 'tel',
    },
    {
        name: 'Driver Name',
        value: (device.driver_name||''),
        edit: true,
        ref: React.useRef(),
        type: 'text',
    },
    {
        name: 'Contact Number',
        value: (device.contact_number||''),
        edit: true,
        ref: React.useRef(),
        type: 'tel',
    },
    {
        name: 'Vehicle Brand',
        value: (device.brand||''),
        edit: true,
        ref: React.useRef(),
        type: 'text',
    },
    {
        name: 'Vehicle Model',
        value: (device.model||''),
        edit: true,
        ref: React.useRef(),
        type: 'text',
    },
];

const [data , setData] = React.useState(inputData);
const [isLoading, setIsLoading] = React.useState(false);
const [statusMsg, setStatusMsg] = React.useState("Loading ...");

function handleSubmit(e, __data=data){
    // If data has changed, update the device
  
    if(JSON.stringify(__data) !== JSON.stringify(inputData)){
        // Required elements/fields to be sent to the server
        // deviceId, name, plateNumber, simNumber, driverName, contactNumber, brand, model
        let _data = {
            deviceId : device.imei,
            name : inputData[0].value,
            plateNumber : inputData[1].value,
            simNumber : inputData[2].value,
            driverName : inputData[3].value,
            contactNumber : inputData[4].value,
            brand : inputData[5].value,
            model : inputData[6].value,
        };
        data.forEach(input => {
            if(input.name === 'Device Name'){
                _data['name'] = input.ref.current.value;
            }
            if(input.name === 'Plate No.'){
                _data['plateNumber'] = input.value;
            }
            if(input.name === 'SIM'){
                _data['simNumber'] = input.value;
            }
            if(input.name === 'Driver Name'){
                _data['driverName'] = input.value;
            }
            if(input.name === 'Contact Number'){
                _data['contactNumber'] = input.value;
            }
            if(input.name === 'Vehicle Brand'){
                _data['brand'] = input.value;
            }
            if(input.name === 'Vehicle Model'){
                _data['model'] = input.value;
            }
        });
        // Disable loading
        setIsLoading(true);
        // Tell the client we're updating the data
        setStatusMsg("Updating ...");
        // Tell the server to update the device details
        axios.post(API+'/device/update', _data, {
            headers: {
                authorization: "bearer " + localStorage.getItem('token').split('"').join('')
            }
        }).then((response) => {
            let data = response.data;
            // Check the request was successful
            if(data.status==='success') {
                // Let the client know the server done its job
                setStatusMsg("Device updated successfully");
                // Wait 2 seconds
                setTimeout(() => {
                    // Remove the message
                    setStatusMsg("");
                    // Disable loading
                    setIsLoading(false);
                    // Go back to device details
                    navigator('deviceDetails');
                }, 2000);
            }
            else {
                // The request was not successful
                // And we had an issue
                // Tell the client about it
                setStatusMsg("Error updating device");
                // Wait 2 seconds
                setTimeout(() => {
                    // Remove the message
                    setStatusMsg("");
                    // Disable loading
                    setIsLoading(false);
                } , 2000);

            }
        })
        .catch((error) => {
            setIsLoading(false);
            // Network error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
}


  return (

    <div className="art_main art_main_initial">
    {isLoading? <Loader text={statusMsg}/>:''}
        <div>
            <Header children={<HeaderEditDevice navigator={navigator} search={search} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch} setShowBottomBar={setShowBottomBar}  /> } navigator={navigator} setviewDevice={setviewDevice}/>

            <form onSubmit={(e)=>{
                e.preventDefault();handleSubmit(e);
            }} className="form_edit_device">

                {data.map((input, index)=>{
                    input.ref.current= {value : input.value};
                    return (
                        <div className="art_form_group" key={index}>
                            <label className="art_form_label" htmlFor={`art_form_input_${index}`}>{input.name}</label>
                            <input className="art_form_input" id={`art_form_input_${index}`} type={input.type}  value={input.ref.current.value?input.ref.current.value:input.value} onChange={(e)=>{
                                if(input.name.toLowerCase() === "plate no."){
                                    data[index].value = e.target.value.toUpperCase();
                                }else {
                                    data[index].value = e.target.value;
                                }
                                setData([...data]);
                            }} placeholder={input.name} 
                            onFocus={(e)=>{
                                 if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn && e.target.value.trim() !== ''){
                                        clearBtn.classList.add('active');
                                     }
                                 }
                            }}
                            onKeyUp={(e)=>{
                                 if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn && e.target.value.trim() !== ''){
                                        clearBtn.classList.add('active');
                                     }else {
                                        clearBtn.classList.remove('active');
                                     }
                                 }
                            }}
                            onBlur={(e)=>{
                                 if (e.target) { 
                                     let clearBtn = e.target.parentElement.querySelector('.art_clear_btn');
                                     if(clearBtn){
                                         setTimeout(() => {
                                             clearBtn.classList.remove('active');
                                         }, 1);
                                        
                                     }
                                 }
                            }}
                            
                            />
                            <Button className="art_clear_btn" name={<X />} onClick={(e)=>{
                                data[index].value = '';
                                setData([...data]);
                            }} />
                        </div>
                    )
                })}

                <Button className="art_submit_btn" name={"Save"} type="submit" />
            </form>
        </div>
    </div>
  );
}

export default EditDevice;
