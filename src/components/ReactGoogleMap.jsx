import React from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_API_KEY} from '../config/index'
import  {ReactComponent as CarIdling} from '../assets/images/mapIcons/single/car_idling.svg'
import  {ReactComponent as CarMoving} from '../assets/images/mapIcons/single/car_moving.svg'
import  {ReactComponent as CarStopped} from '../assets/images/mapIcons/single/car_stopped.svg'
import  {ReactComponent as CarOffline} from '../assets/images/mapIcons/single/car_offline.svg'

import { fetchProducts } from './fetchProducts';
import CustomBottomSheet from './customBottomSheet';

const mapIcons = {
    idling: CarIdling,
    moving: CarMoving,
    stopped: CarStopped,
    offline: CarOffline
};


function fetchProductsContinuously (Timer, type, setProducts) {
    fetchProducts(type).then(res=>results(res, Timer, setProducts));
}

const AnyReactComponent = ({ text, Icon,status, rotation, speed, lat, lng, selectedDeviceRef, device, map, setShowBottomSheet}) => {

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
                        if (map){
                            map.panTo({lat, lng});
                            map.setZoom(18);
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
};

function results (res, Timer, setProducts, showBottomSheet, selectedDeviceRef) {
    try {
    
        let data = res.data;
        // get devices from groups inside data object
        let devices =Object.values(data).map(group => group);
            
        devices = devices.flat();
        
        setProducts(devices);

        if(devices.length ===1&&showBottomSheet) selectedDeviceRef.current = devices[0];

    } catch (error) {
        console.log(error);
    }
}

function ReactGoogleMap({currentTab, setCurrentMapDevice}) {
    const [products, setProducts] = React.useState([]);
    const isMounted = React.useRef(true);

    const mapRef = React.useRef(null);
    const mapsRef = React.useRef(null);

    const selectedDeviceRef = React.useRef(null);

    const [showBottomSheet,setShowBottomSheet] = React.useState(currentTab.toLowerCase() !== 'all');
  
    React.useEffect(() => {
        let Timer = null;
        isMounted.current = true;
        
        if (currentTab !== 'all') {
            clearInterval(Timer)
        }
        if(isMounted.current) {
            fetchProducts(currentTab||'All').then(res => {
                results(res, Timer, setProducts,showBottomSheet, selectedDeviceRef);
            });
            
            Timer = setInterval(() => fetchProductsContinuously(Timer,currentTab||'All', setProducts), 10000/1);
        }
        
        return () => {
            if (!isMounted.current) {
                clearInterval(Timer);
            }
            isMounted.current = false;
            setCurrentMapDevice('All');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isMounted]);

    const user = JSON.parse(localStorage.getItem('user'));
    const {lat, lng} = user;

    const defaultProps = {
        center: {
            lat,
            lng
        },
        zoom: 0,
        tileSize: 512,
        // maxZoom: 18,
        zoomOffset: -1,
        defaultMapOptions : {
            disableDefaultUI: true,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            panControl: true,
            clickableIcons: false,
            // styles: mapStyle,
            // styles: [
            //     {
            //         "featureType": "transit.station",
            //         "stylers": [{ "visibility": "off" }]
            //     }
            // ],
          }
    };

    if (selectedDeviceRef.current) {
        //  if(isMounted.current){
            if (mapRef.current.getZoom() > 12) {
                //  get current pan
                // const currentPan = mapRef.current.getCenter();
                // pan only if the current pan is not the same as the selected device
                // if(currentPan.lat().toFixed(6) !== selectedDeviceRef.current.lat.toFixed(6) && currentPan.lng().toFixed(6) !==          selectedDeviceRef.current.lng.toFixed(6)) {
                // if(typeof selectedDeviceRef.current.status === "string" && selectedDeviceRef.current.status.toLowerCase() === "moving") {
                    mapRef.current.panTo({lat: selectedDeviceRef.current.lat, lng: selectedDeviceRef.current.lng});
                // }
                
            } else {
                selectedDeviceRef.current = null;
                document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
                // setShowBottomSheet(false);
            }
        //  }else {
        //      console.log('not mounted');
        //  }
    } else {
        // setShowBottomSheet(false);
        console.log('no selected device');
        document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
    }
    // if (currentTab.toLowerCase() !== 'all') {
    //     if(products.length ===1 &&showBottomSheet ) selectedDeviceRef.current = products[0];
    // }
    
    if (!showBottomSheet) document.documentElement.style.setProperty('--bootSheetHeight', `0px`);

    return (
        <>
    <div style={{ /* height: '70vh', */ width: '100vw' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        yesIWantToUseGoogleMapApiInternals={true}
        // maxZoom={defaultProps.maxZoom}
        // mapTypeControl= {false}
        zoomOffset={defaultProps.zoomOffset}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={defaultProps.defaultMapOptions}
        clickableIcons={false}
        styles={true}
        onGoogleApiLoaded={({map, maps}) => {
                mapRef.current = map;
                mapsRef.current = maps;
                setTimeout(() => {
                    let lable = window.document.querySelector('a[title="Open this area in Google Maps (opens a new window)"]');
                    if (lable) {
                        lable.removeAttribute('href');
                        lable.removeAttribute('target');
                        lable.removeAttribute('title');
                        lable.querySelectorAll('div').length && (lable.querySelectorAll('div')[0].style.cursor= 'default');
                    }

                }, 5000);
         }} 
        >
        {
            products.length && products.map((car, index) => {
                // bounds
                if (car.status&& car.lat!==0&& car.lng!==0) {
                    const {lat, lng, status, name} = car;
                    
                    let Icon = mapIcons[status];

                    if (selectedDeviceRef.current && selectedDeviceRef.current.imei === car.imei) {
                        selectedDeviceRef.current = car;
                    }
            
                    return (<AnyReactComponent key={car.imei+index}
                        lat={lat}
                        lng={lng}
                        text={name}
                        Icon={Icon}
                        rotation= {car.angle}
                        altitude={car.altitude}
                        status={car.status}
                        speed={car.speed}
                        map={mapRef.current}
                        device={car}
                        selectedDeviceRef={selectedDeviceRef}
                        setShowBottomSheet={setShowBottomSheet}
                    />)
                }
                return null;
                 
            }) 
 
        }

        
        
    </GoogleMapReact>
    {showBottomSheet &&
    <CustomBottomSheet  selectedDeviceRef={selectedDeviceRef} mapRef={mapRef.current} setShowBottomSheet={setShowBottomSheet} />}
    </div>
    </>
    );
}


export default ReactGoogleMap;
