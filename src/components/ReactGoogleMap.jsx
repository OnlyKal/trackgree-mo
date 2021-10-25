import React from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_API_KEY} from '../config/index'
import  {ReactComponent as CarIdling} from '../assets/images/mapIcons/single/car_idling.svg'
import  {ReactComponent as CarMoving} from '../assets/images/mapIcons/single/car_moving.svg'
import  {ReactComponent as CarStopped} from '../assets/images/mapIcons/single/car_stopped.svg'
import  {ReactComponent as CarOffline} from '../assets/images/mapIcons/single/car_offline.svg'
import  {ReactComponent as TyleType} from '../assets/images/TyleType.svg'
import  {ReactComponent as TyleTypeFilled} from '../assets/images/TyleTypeFilled.svg'

import { fetchProducts } from './fetchProducts';
import CustomBottomSheet from './customBottomSheet';
import * as mapStyle from '../components/mapStyle.js';
import Button from './Button';
const mapIcons = {
    idling: CarIdling,
    moving: CarMoving,
    stopped: CarStopped,
    offline: CarOffline
};


function fetchProductsContinuously (Timer, type, setProducts) {
    return fetchProducts(type).then(res=>results(res, Timer, setProducts));
}

const AnyReactComponent = ({ text, Icon,status, rotation, speed, lat, lng, selectedDeviceRef, device, map, setShowBottomSheet, maps}) => {

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
                            // const bounds = new maps.LatLngBounds();
         
                            // if(device.lat && device.lng) {
                            //     bounds.extend(new maps.LatLng(device.lat, device.lng));

                            //     // fit map bounds
                            //     map.fitBounds(bounds, {
                            //         lat: 0.01,
                            //         lng: 0.01
                            //         }
                            //     );
                            // }
        

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
};

function results (res, Timer, setProducts, showBottomSheet, selectedDeviceRef) {
    try {
        let data = res.data;
        // get devices from groups inside data object
        let devices =Object.values(data).map(group => group);
            
        devices = devices.flat();
        
        setProducts(devices);

        if(devices.length ===1) return devices[0];
        return null

    } catch (error) {
        console.log(error);
        return null;
    }
}

function ReactGoogleMap({currentTab, setCurrentMapDevice}) {
    const [products, setProducts] = React.useState([]);
    const isMounted = React.useRef();

    const mapRef = React.useRef(null);
    const mapsRef = React.useRef(null);

    const selectedDeviceRef = React.useRef(null);
    const firstLoad = React.useRef(true);

    const [showBottomSheet,setShowBottomSheet] = React.useState(currentTab.toLowerCase() !== 'all');
  
    const [mapType, setMapType] = React.useState('ROADMAP');

    React.useEffect(() => {
        let Timer = null;
        isMounted.current = true;
        
        if (currentTab !== 'all') {
            clearInterval(Timer)
        }
        if(isMounted.current) {
            fetchProducts(currentTab||'All').then(res => {
                
                let rs = results(res, Timer, setProducts,showBottomSheet, selectedDeviceRef);
                if (rs && currentTab.toLowerCase() !=='all') {
                    selectedDeviceRef.current = rs;
                }
            });
            
            Timer = setInterval(() => {
                let rs = fetchProductsContinuously(Timer,currentTab||'All', setProducts);
                    rs.then(rs=>{
                        if(rs && currentTab.toLowerCase() !=='all') {
                            selectedDeviceRef.current = rs; 
                        }
                    });
            }, 10000/1);

        }
        
        return () => {
            setCurrentMapDevice('All');
            isMounted.current = false;
            clearInterval(Timer);
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
        defaultMapOptions : (maps) =>{
            return {
            // disableDefaultUI: true,
            fullscreenControl: false,
            // mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            panControl: true,
            clickableIcons: false,
            styles: mapStyle,

            mapTypeId: maps.MapTypeId[mapType],
            mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID
                ]
            },
        }
        },
        
    };
    
    if(products.length === 1 && currentTab.toLowerCase() !== 'all') {
        selectedDeviceRef.current = products[0];

        if (mapRef.current && mapRef.current.getZoom() <= 10) {
            //  get current pan
            const currentPan = mapRef.current.getCenter();
            // pan only if the current pan is not the same as the selected device
            if(currentPan.lat().toFixed(6) !== selectedDeviceRef.current.lat.toFixed(6) && currentPan.lng().toFixed(6) !== selectedDeviceRef.current.lng.toFixed(6)) {
                mapRef.current.panTo({lat: selectedDeviceRef.current.lat, lng: selectedDeviceRef.current.lng});
                mapRef.current.panBy(selectedDeviceRef.current.lat, selectedDeviceRef.current.lng);
            }
            mapRef.current.setZoom(11);
        }
    }

    if (selectedDeviceRef.current) {
        let prod = selectedDeviceRef.current
        if(isMounted.current){
            if (mapRef.current&&mapRef.current.getZoom() > 10) {
                //  get current pan
                const currentPan = mapRef.current.getCenter();
                // pan only if the current pan is not the same as the selected device
                if(currentPan.lat().toFixed(6) !== prod.lat.toFixed(6) && currentPan.lng().toFixed(6) !== prod.lng.toFixed(6)) {
              
                        mapRef.current.panTo({lat: prod.lat, lng: prod.lng});
                      
                }
            } else {
                selectedDeviceRef.current = null;
                document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
            }
        }
    } else {
        document.documentElement.style.setProperty('--bootSheetHeight', `0px`);
    }

    if (products.length && selectedDeviceRef.current === null && firstLoad.current) {
        // pan to all the products by there lat/lng
        if(mapRef.current && mapsRef.current) {
            // get lat/lng of all the products
            const bounds = new mapsRef.current.LatLngBounds();
            products.forEach(product => {
                if(product.lat && product.lng) {
                    bounds.extend(new mapsRef.current.LatLng(product.lat, product.lng));
                }
            });
            // fit map bounds
            mapRef.current.fitBounds(bounds);
            firstLoad.current = false;
        }
    }
    
    if (!showBottomSheet) document.documentElement.style.setProperty('--bootSheetHeight', `0px`);

    let mapLanguage = 'en';
    if(user.language) {
        mapLanguage = user.language.slice(0, 2).toLowerCase();
    }

    return (
        <>
    <div style={{ /* height: '70vh', */ width: '100%' }}>
        <Button onClick={() => {
            setMapType(mapType === 'ROADMAP'? 'HYBRID' : mapType === 'HYBRID'?'SATELLITE':'ROADMAP');
        }}
        className={"art_map_tyles"}
        children={(mapType === 'HYBRID'||mapType === 'SATELLITE')? <TyleTypeFilled /> :<TyleType />  }
        />
        <GoogleMapReact
            bootstrapURLKeys={{
                key: GOOGLE_API_KEY ,
                language: mapLanguage,
                region: mapLanguage,
            }}
                
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
                        maps={mapsRef.current}
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
