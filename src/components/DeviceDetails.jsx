import React from 'react';
import Header from './Header.jsx'
import HeaderDeviceDetails from './HeaderDeviceDetails.jsx';
import {ReactComponent as DeviceName} from '../assets/images/DeviceName.svg';
import {ReactComponent as DeviceType} from '../assets/images/DeviceType.svg';
import {ReactComponent as DeviceIMEI} from '../assets/images/DeviceIMEI.svg';
import {ReactComponent as DeviceSim} from '../assets/images/DeviceSim.svg';
import {ReactComponent as DeviceStatus} from '../assets/images/DeviceStatus.svg';
import {ReactComponent as Ignition} from '../assets/images/Ignition.svg';
import {ReactComponent as DeviceLocationTime} from '../assets/images/DeviceLocationTime.svg';
import {ReactComponent as DeviceLastUpdate} from '../assets/images/DeviceLastUpdate.svg';
import {ReactComponent as DeviceSpeed} from '../assets/images/DeviceSpeed.svg';
import {ReactComponent as DeviceLatitude} from '../assets/images/DeviceLatitude.svg';
import {ReactComponent as DeviceLongitude} from '../assets/images/DeviceLongitude.svg';
import {ReactComponent as DeviceAddress} from '../assets/images/DeviceAddress.svg';
import {ReactComponent as DevicePlateNumber} from '../assets/images/DevicePlateNumber.svg';
import {ReactComponent as user_driver} from '../assets/images/user_driver.svg';
import {ReactComponent as DeviceContactNumber} from '../assets/images/DeviceContactNumber.svg';
import {ReactComponent as DeviceVehicleBrand} from '../assets/images/DeviceVehicleBrand.svg';
import {ReactComponent as DeviceVehicleModel} from '../assets/images/DeviceVehicleModel.svg';
import { API, GEOCODEAPI } from '../config/index'
import axios from 'axios';

function DeviceDetails({navigator, device:_device,setviewDevice, currentPage}) {
  const [address, setAddress ] = React.useState('');
  const [device, setDevice] = React.useState(_device);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    if (isMounted.current) {
      axios.get(`${API}/device/details/${device.imei}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token').split('"').join('')}`
      }}).then(res => {
        
        if('rows' in res.data && res.data.rows.length > 0) {
          setDevice(res.data['rows'][0]);
          setviewDevice(res.data['rows'][0]);
          axios(GEOCODEAPI(res.data['rows'][0].lat , res.data['rows'][0].lng)).then(function(data) {
            data = data.data;
            setAddress(data.results[0].formatted_address);
          });
    
        }
      }).catch(err => {
        console.log(err);
      });
    }

    return () => {
      isMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const detailsElements = [
    {
      title: 'Device Name',
      value: device.name, 
      icon: DeviceName
    },
    {
      title: 'Device Type',
      value: device.device,
      icon: DeviceType
    },
    {
      title: 'IMEI',
      value: device.imei,
      icon: DeviceIMEI
    },
    {
      title: 'Sim',
      value: device.sim_number,
      icon: DeviceSim
    },
    {
      title: 'Status',
      value: device.status[0].toString().toUpperCase()+device.status.toString().toLowerCase().slice(1),
      icon: DeviceStatus
    },
    {
      title: 'ACC',
      value: device.params.acc>0? 'ON': 'OFF',
      icon: Ignition
    },
    {
      title: 'Location Time',
      value: new Date(device.dt_tracker).toLocaleString().split('/').join('-').replace(',',''),
      icon: DeviceLocationTime
    },
    {
      title: 'Last Update',
      value: new Date(device.dt_server).toLocaleString().split('/').join('-').replace(',',''),
      icon: DeviceLastUpdate
    },
    {
      title: 'Speed',
      value: device.speed+' km/h',
      icon: DeviceSpeed
    },
    {
      title: 'Latitude',
      value: device.lat,
      icon: DeviceLatitude
    },
    {
      title: 'Longitude',
      value: device.lng,
      icon: DeviceLongitude
    },
    {
      title: 'Address',
      value: address,
      icon: DeviceAddress
    },
    {
      title: 'Plate No.',
      value: device.plate_number,
      icon: DevicePlateNumber
    },
    {
      title: 'Driver',
      value: (device.driver_name||''),
      icon: user_driver
    },
    {
      title: 'Contact Number',
      value: (device.contact_number||''),
      icon: DeviceContactNumber
    },
    {
      title: 'Vehicle Brand',
      value: device.brand,
      icon: DeviceVehicleBrand
    },
    {
      title: 'Vehicle Model',
      value: (device.model||''),
      icon: DeviceVehicleModel
    },

  ];

  return (
 
    <div className="art_main art_main_initial">   
    {
      <Header children={<HeaderDeviceDetails navigator={navigator} />}  navigator={navigator}/>

    }
    <div className="art_device_details_co">
      
          {
            detailsElements.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <div className="art_detail_co" key={index} >
                <div className="art_deatils_icon">
                  <Icon />
                </div>
                <div className="art_device_details">
                  <div className="art_device_details_name">
                    <span>{item.title}</span>
                  </div>
                  <div className={"art_device_details_value"}>
                    <span>{item.value}</span>
                  </div>
                </div>
                </div>
              )
            })
            }
          
    </div>
    </div>
  );
}

export default DeviceDetails;
