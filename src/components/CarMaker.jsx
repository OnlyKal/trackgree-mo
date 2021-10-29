import React from 'react';
import  {ReactComponent as CarIdling} from '../assets/images/mapIcons/single/car_idling.svg'
import  {ReactComponent as CarMoving} from '../assets/images/mapIcons/single/car_moving.svg'
import  {ReactComponent as CarStopped} from '../assets/images/mapIcons/single/car_stopped.svg'
import  {ReactComponent as CarOffline} from '../assets/images/mapIcons/single/car_offline.svg'
const mapIcons = {
    idling: CarIdling,
    moving: CarMoving,
    stopped: CarStopped,
    offline: CarOffline
};


function CarMaker({ text, Icon,status, rotation, speed, lat, lng, selectedDeviceRef, device, map, setShowBottomSheet, maps}) {
    Icon = Icon || mapIcons[status];
    return (
            <div className="art_map_marker" >
                <div className={"art_map_title "+status}>
                    {text.split(' ').join('\u00A0').split('-').join('\u00A0')+'\u00A0('+speed+'\u00A0km/h)'} 
                    <span className="art_marker_pointer"></span>
                </div>
                <span className="art_icon_wrapper"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    // select device
                    onClick={() => {
                        try {
                        
                            selectedDeviceRef.current = device;
                            setShowBottomSheet(true);
                            if (maps && map){
                                map.panTo({lat, lng});
                                map.setZoom(15);
            

                            } else {
                                console.log(maps);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}

                >
                    {typeof Icon === 'object' && <Icon />}
                </span>
            </div>
        );
}

export default CarMaker;
