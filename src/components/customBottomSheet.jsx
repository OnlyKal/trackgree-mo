import axios from 'axios';
import React from 'react';
import { X } from 'react-feather';
import {ReactComponent as acc} from '../assets/images/sensors/Acc1.svg';
import {ReactComponent as gpslev} from '../assets/images/sensors/gpsLevel.svg';
import {ReactComponent as Odo} from '../assets/images/sensors/Odo.svg';
import { GEOCODEAPI } from '../config';

function CustomBottomSheet({selectedDeviceRef, setShowBottomSheet, mapRef}) {
    let currentDevice = selectedDeviceRef;
    selectedDeviceRef = currentDevice.current;
    const [dragging, setDragging] = React.useState(false);
    const [dragged, setDragged] = React.useState(false);
    const [pan, setPan] = React.useState({ x: 0, y: 190 });
    const [panStart, setPanStart] = React.useState({ x: 0, y: 0 });
    const slide_down = () => { 
        console.log('slide down');
    }
    const slide_up = () => {
        console.log("slide up");
    }
    
    const onPanStart = e => {
        setDragging(true);
        setPanStart(getPan(e));
        if (pan.y > 190) {
        setDragged(true);
        }
    };

    const onPan = e => {
        if (e.clientX <= 0 || e.clientY <= 0) return false;
        setPan(getPan(e));

    };

    const onPanEnd = e => {
        let changedY = panStart.y;
        setDragging(false);
        if (dragged){
            if(pan.y > changedY+25){
                slide_down();
            } else if(pan.y < changedY-25){
                slide_up();
            }
            
        }
        setDragged(false);
    };
    if (!dragging && selectedDeviceRef) {
        document.documentElement.style.setProperty('--bootSheetHeight', `${190}px`);
    } else {
        if (selectedDeviceRef === null) {
            document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
        }
    }

    let sensors =[
        'acc', 'gpslev', /* 'batl', */ /* 'gps', */
    ]
    let sensorsValue = {
        acc: ['OFF', 'ON'],
    }
    let sensorIcons = {
        acc: acc,
        gpslev: gpslev,
    }
    let odometerTypes = [
        'GPS',
        'LBS',
        'WIFI',
        'IPT'
    ];

    return (
       selectedDeviceRef&& <div className="art_tracking_map" 
        style={{
            height: `var(--bootSheetHeight)`,
        }}
        onTouchStart={ onPanStart }
        onTouchMove={ onPan }
        onTouchEnd={ onPanEnd }
        >
            <div className="art_tracking_map_header">
                <div className="art_tracking_map_header_title">
                    
                    <h5>{selectedDeviceRef.name}</h5>
                </div>
                <div className="art_tracking_map_header_imei">
                    <p>{selectedDeviceRef.imei}</p>
                </div>
                <div className="art_tracking_map_header_button">
                    <button className="art_tracking_map_header_button_button" onClick={(e)=>{
                        document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
                        setShowBottomSheet(false);
                        currentDevice.current = null;
                        selectedDeviceRef = null;
                        mapRef.setZoom(1);

                    }}> <X /></button>
                </div>
            </div>
            <div className="art_tracking_map_body">
                <div className={"art_tracking_map_body_status "+selectedDeviceRef.status.toLowerCase()}>
                    <h3 className="art_tracking_map_body_status_title">
                        {selectedDeviceRef.status[0].toUpperCase()+selectedDeviceRef.status.slice(1).toLowerCase()}
                    </h3>
                    <span className="art_tracking_map_body_status_time">
                        {selectedDeviceRef.statusTime.split(' ').slice(0, 2).join(' ')}
                    </span>
                </div>
                {/* Sensors */}
                {Object.keys(selectedDeviceRef.params).length && <div className="art_tracking_map_body_sensors">
                    {
                        Object.keys(selectedDeviceRef.params).map((sensor, index) => {
                            if (sensors.includes(sensor)) {
                            let SensorIcon = sensorIcons[sensor];
                            if (typeof SensorIcon === 'object' ){
                            return (
                                <div className="art_tracking_map_body_sensors_sensor" key={index}>
                                    <div className="art_tracking_map_body_sensors_sensor_name">
                                        { typeof SensorIcon === 'object' && <SensorIcon />}
                                    </div>
                                    <div className="art_tracking_map_body_sensors_sensor_value">
                                        <p>{sensorsValue[sensor]?sensorsValue[sensor][selectedDeviceRef.params[sensor]]:selectedDeviceRef.params[sensor]}</p>
                                    </div>
                                </div>
                            )
                            }
                            return null;
                        }
                            return null;
                        })
                    }

                    {
                        selectedDeviceRef.odometer &&  <div className="art_tracking_map_body_sensors_sensor" >
                                    <div className="art_tracking_map_body_sensors_sensor_name">
                                        
                                        { typeof Odo === 'object' && <Odo />}
                                    </div>
                                    <div className="art_tracking_map_body_sensors_sensor_value">
                                        <p>{selectedDeviceRef.odometer.toFixed(2)} {'km'}</p>
                                    </div>
                                </div>
                    }
                    

                    </div>}
                {/* Odo type */}
                <div className="art_tracking_map_body_odometer_type">
                    { 
                    odometerTypes.map((type, index) => {
                        if (type.toLowerCase() === selectedDeviceRef.odometer_type.toLowerCase()) {
                            return (
                                <b className="art_tracking_map_body_odometer_type_content selected" key={index}>
                                    {type}
                                </b>
                            )
                        }
                        return (
                                <p className="art_tracking_map_body_odometer_type_content" key={index}>
                                    {type}
                                </p>
                        )
                    })
                    }

                </div>
            </div>
            <div className="art_tracking_map_footer">
                <button className="art_tracking_map_footer_button"
                onClick={(e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    let btn = e.currentTarget|| e.target;
                    if(btn) btn.innerText = "Fetching address...";
                    // get address from google api using lat/lng coordinates
                    axios(GEOCODEAPI(selectedDeviceRef.lat , selectedDeviceRef.lng)).then(function(data) {
                        data = data.data;
                        if (btn) btn.innerText = data.results[0].formatted_address;
                      }).catch(function(error) {
                        console.error(error);
                        if (btn) btn.innerText = "Fetch address";
                      });
                
                }}
                >
                    {'Fetch address'}
                </button>
            </div>
        </div>
    );
}


function getPan(e) {
    if (e.type.includes('drag')) {
      return { x: e.clientX, y: e.clientY };
    }
  
    const touch = e.targetTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

export default CustomBottomSheet;
