import React from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_API_KEY} from '../config/index';
import  styledStyles from '../components/mapStyle.js';
import Button from './Button';
import  {ReactComponent as TyleType} from '../assets/images/TyleType.svg'
import  {ReactComponent as TyleTypeFilled} from '../assets/images/TyleTypeFilled.svg'
import  {ReactComponent as Speed} from '../assets/images/Speed.svg'
import  {ReactComponent as Odometer} from '../assets/images/sensors/Odo.svg'
import  StartPoint from '../assets/images/StartPoint.png'
import  EndPoint from '../assets/images/EndPoint.png'
import  StopPoint from '../assets/images/StopPoint.png'
import Header from './Header';
import HeaderEditDevice from './HeaderEditDevice';
import Loader from './Loader';
import   CarIdling from '../assets/images/mapIcons/single/car-idling.png'
import CarMoving from '../assets/images/mapIcons/single/car-moving.png'
import CarStopped from '../assets/images/mapIcons/single/car-stopped.png'
import CarOffline from '../assets/images/mapIcons/single/car-offline.png'
import  {ReactComponent as CarIdling2} from '../assets/images/mapIcons/single/car_idling.svg'
import  {ReactComponent as CarMoving2} from '../assets/images/mapIcons/single/car_moving.svg'
import  {ReactComponent as CarStopped2} from '../assets/images/mapIcons/single/car_stopped.svg'
import  {ReactComponent as CarOffline2} from '../assets/images/mapIcons/single/car_offline.svg'
import { Activity, Clock, FastForward, Pause, Play } from 'react-feather';
import { getDistance } from './fetchProducts';

const mapIcons = {
    idling: CarIdling,
    moving: CarMoving,
    stopped: CarStopped,
    offline: CarOffline
};
const mapIcons2 = {
    idling: CarIdling2,
    moving: CarMoving2,
    stopped: CarStopped2,
    offline: CarOffline2
};


const {mapStyleDark, mapStyle} = styledStyles;

function HistoryGoogleMap({navigator, deviceData, device}) {

        

    const [isLoading, _setIsLoading] = React.useState(false);
    const setIsLoading = (value) => {
        _setIsLoading(value);
        setStatusMsg(value ? "Loading ..." : "");
    }
    const [playMode, setPlayMode] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [mapType, setMapType] = React.useState('ROADMAP');
    const [statusMsg, setStatusMsg] = React.useState("Loading ...");
    const [collapsedTimeCounter, setCollapsedTimeCounter] = React.useState(0);

    const mapRef = React.useRef(null);
    const mapsRef = React.useRef(null);
    const animateMarker = React.useRef(null);
    const animateCount= React.useRef(0);
    const fastForwardMode= [
        {
            delay: 600,
            name: '1 sec',
            title: 'Slow'
        },
        {
            delay: 300,
            name: '2 secs',
            title: 'Medium'
        },
        {
            delay: 100,
            name: '5 secs',
            title: 'Fast'
        },
        {
            delay: 50,
            name: '5 secs',
            title: 'Faster'
        },
    ];
    const animateDelay = React.useRef(fastForwardMode[playMode].delay);
    const isAnimated = React.useRef(null);
    const position = React.useRef([]);
    const numDeltas = React.useRef(0);


    let timer =  React.useRef(null);

    let isMounted = React.useRef(false);

    React.useEffect(() => {
        isMounted.current = true;
        if (!isMounted.current) {
            clearTimeout(timer.current);
        }
        return () => {
            isMounted.current = false;
            clearTimeout(timer.current);
        }
    }, [isMounted, timer]);

    try {
    
        let DeviceIcon = mapIcons2[device.status];
    
        const moment = require('moment');
        let previousPage = localStorage.getItem('previousPage');

        const user = JSON.parse(localStorage.getItem('user'));
        const {lat, lng} = user;

        const defaultProps = {
            center: {
                lat,
                lng
            },
            zoom: 0,
            tileSize: 512,
            zoomOffset: -1,
            defaultMapOptions : (maps) =>{
                return {
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
            
                panControl: true,
                clickableIcons: false,
                styles:styledStyles|| mapStyleDark||mapStyle,
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

        animateDelay.current = fastForwardMode[playMode].delay;
        
        let mapLanguage = 'en';
        if(user.language) {
            mapLanguage = user.language.slice(0, 2).toLowerCase();
        }

        // get polyline path from deviceData
        const polylinePath = deviceData.map(device => {
            return {
                lat: device.lat,
                lng: device.lng,
            }
        });

        function counterAnimation(animateCount, myIsPlaying) {
            let count = animateCount.current;
            

            count++;

            if (myIsPlaying) {

                if (count > polylinePath.length - 1) {
                    animateCount.current =0;
                    isAnimated.current = false;
                    setIsPlaying(false);
                return clearTimeout(timer.current);
                }

                let map = mapRef.current;
                let maps = mapsRef.current;

                animateMarker.current.setIcon({
                    url: mapIcons['moving'],
                    scaledSize: new maps.Size(13, 26),
                    origin: new maps.Point(0, 0),
                    anchor: new maps.Point(0, 0),
                });
            
                animateMarker.current.setPosition(polylinePath[count]);
                map.panTo(animateMarker.current.getPosition());

                timer.current  = setTimeout(()=>{
                    animateCount.current = count;
                    counterAnimation(animateCount, myIsPlaying);
                }, animateDelay.current, myIsPlaying);
            } else {
                clearTimeout(timer.current);
            }

            animateCount.current = count;
            if (isMounted.current) {
                if(animateCount.current > 0 && animateCount.current !== collapsedTimeCounter) {
                    setCollapsedTimeCounter(animateCount.current);
                }
            }
            return timer.current;
        }



        return (
            <>
            <Header children={<HeaderEditDevice navigator={navigator} name={"Playback"} back={previousPage} beforeBack={(back)=>{
                clearTimeout(timer.current);
                setIsPlaying(false);
            }}  /> } navigator={navigator} />

            {isLoading && <Loader text={statusMsg} dismiss={setIsLoading}/>}
        <div style={{ width: '100%' }}>
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

                    // Create the polyline using the polylinePath
                    new maps.Polyline({
                        path: polylinePath,
                        strokeColor: '#5AA832',
                        strokeOpacity: 1.0,
                        strokeWeight: 2.5,
                        map: map,
                    });

                    // set bounds using the polylinePath
                    let bounds = new maps.LatLngBounds();

                    // Create a marker for each polyline path
                    polylinePath.forEach((path, index) => {
                        // Store bounds
                        bounds.extend(new maps.LatLng(path.lat, path.lng));

                        if (deviceData[index].speed === 0) {
                            new maps.Marker({
                                position: path,
                                map: map,
                                icon: {
                                    url: StopPoint,
                                    scaledSize: new maps.Size(20, 30),
                                },
                            });
                        }
                    });

                    let firstPosition = polylinePath[0];
                    if (firstPosition){
                        // Create a marker for the first polyline path
                        new maps.Marker({
                            position: firstPosition,
                            map: map,
                            icon: {
                                url: StartPoint,
                                scaledSize: new maps.Size(25, 35),
                            },
                        });

                        // Store first position
                        position.current = [firstPosition.lat, firstPosition.lng];
                        // Store deltaLength from polylinePath
                        numDeltas.current = polylinePath.length;
                        // Create a marker for the first polyline path
                        let marker2 = new maps.Marker({
                            position: {lat:firstPosition.lat, lng:firstPosition.lng},
                            map: map,
                            icon: {
                                url: mapIcons['moving'],
                                scaledSize: new maps.Size(13, 26),
                                anchor: new maps.Point(0, 0),
                            },
                            optimized: false,
                            id: "#markerId2",
                        });
                        animateMarker.current = marker2;

                        

                        animateMarker.current.addListener("click", () => {
                            map.setZoom(18);
                            map.setCenter(animateMarker.current.getPosition());
                        });
        
                        new maps.Marker({
                            position: polylinePath[polylinePath.length - 1],
                            map: map,
                            icon: { 
                                url: EndPoint,
                                scaledSize: new maps.Size(25, 35),
                            },
                        });

                        // Fit map to the history bounds
                        map.fitBounds(bounds);
                    }
                }}
                onChange={() => {
                    if (mapRef.current) {
                        let lable = window.document.querySelector('a[href="'+mapRef.current.mapUrl+'"]');
                        if (lable) {
                            setTimeout(() => {
                                lable.removeAttribute('href');
                                lable.removeAttribute('target');
                                lable.removeAttribute('title');
                                lable.querySelectorAll('div').length && (lable.querySelectorAll('div')[0].style.cursor= 'default');
                            }, 500);
                        }
                    }
                }}
            >
        </GoogleMapReact>
        <div className="art_playback_map_bottom_sheet">
            <div className="art_history_controller">
                
                <button className="art_play_pause" onClick={() =>{
                    let anime = isAnimated.current;

                    if(isPlaying && anime === null){
                    isAnimated.current = true;
                    } else {
                        if (isAnimated.current === true) {
                            isAnimated.current = false;
                        } else {
                            isAnimated.current = true;
                        }
                    }
                    

                    if (isPlaying === false && anime === null) {
                        setIsPlaying(true);
                    } else {
                        if (anime !== null && isPlaying ) {
                            setIsPlaying(false);
                        } else {
                            setIsPlaying(true);
                        }
                    }
                    if (isAnimated.current) {
                        if (anime === null){
                            mapRef.current.setZoom(18);
                        }
                        counterAnimation(animateCount, true); 
                    } else {
                        clearTimeout(timer.current);
                    }
                    
                }}>
                    
                    {isAnimated.current === null  ? <Play /> : isPlaying ? <Pause /> : <Play />}
                    
                </button>
                <div className="art_time_consumer_container">
                    <div className="art_time_consumer">
                        <div className="art_time_consumer_collapsed"
                            style={{
                                width: `${(collapsedTimeCounter / deviceData.length) * 100}%`,
                            }}></div>
                    </div>
                </div>
                <button className="art_time_speed_controller"
                onClick={() => {
                    if (isAnimated.current) {
                        clearTimeout(timer.current);
                        counterAnimation(animateCount, true);
                    } 
                    //  find next time speed from fastForward array
                    if ( fastForwardMode[playMode+1]) {
                        setPlayMode(playMode + 1);
                    } else {
                        setPlayMode(0);
                    }
                }}
                >
                    <FastForward />
                    <span>{
                        fastForwardMode[playMode].title
                    }</span>
                </button>

                <div className="art_history_data_item">
                    <span>{moment(deviceData[0].dt_tracker).format('YYYY-MM-DD HH:mm:ss')}</span>
                    -
                    <span>{moment(deviceData[deviceData.length - 1].dt_tracker).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
            </div>
            { deviceData.length && 
            <div className="art_history_data">
                <div className="art_history_data_tracker">
                        { deviceData[collapsedTimeCounter] && <>
                        <div className="art_history_clock"> 
                            <div className="art_history_data_tracker_time">
                                <div className="art_icon">
                                    <Clock />
                                </div>
                                <div className="art_date_container">
                                    <span className="art_date_time">
                                        {moment(deviceData[0].dt_tracker).format('HH:mm:ss')}
                                    </span>
                                    <div className="art_date_date">
                                        {moment(deviceData[0].dt_tracker).format('DD.MM.YYYY')}
                                    </div>
                                </div>
                            </div>
                            <div className="art_divider">
                                <Activity />
                            </div>
                            <div className="art_history_data_tracker_time">
                                <div className="art_icon">
                                    <Clock />
                                </div>
                                <div className="art_date_container">
                                    <span className="art_date_time">
                                        {moment(deviceData[collapsedTimeCounter > 0?collapsedTimeCounter:deviceData.length-1].dt_tracker).format('HH:mm:ss')}
                                    </span>
                                    <div className="art_date_date">
                                        {moment(deviceData[collapsedTimeCounter > 0?collapsedTimeCounter:deviceData.length-1].dt_tracker).format('DD.MM.YYYY')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="art_speed_container">
                            <span className="art_speed_ico">
                                <Speed />
                            </span>
                            <div className="art_speed_value">
                                {deviceData[collapsedTimeCounter].speed === 0?deviceData[collapsedTimeCounter].speed.toFixed(1)+'km/h':deviceData[collapsedTimeCounter].speed+'km/h'}
                            </div>

                        </div>
                        <div className="art_speed_container">
                            <span className="art_speed_ico">
                                <Odometer />
                            </span>
                            <div className="art_speed_value">
                                {(getDistance({lat:deviceData[0].lat, lng:deviceData[0].lng}, {lat: deviceData[deviceData.length - 1].lat, lng:deviceData[deviceData.length - 1].lng})/1000).toFixed(2) + 'km'}
                            </div>

                        </div>
                        </>
                        }
                </div>
            </div>
            }
            {
                typeof device !== 'undefined' &&
                <div className="art_device_data">
                    <div className="art_device_name">
                        <span>{device.name}</span>
                    </div>
                    <div className="art_device_icon">
                        {typeof DeviceIcon === 'object' ?<DeviceIcon />: <CarMoving2 />}
                    </div>
                    <div className="art_device_imei">
                        <span>{device.imei}</span>
                        <span>{device.sim_number}</span>
                        <span>{device.driver_name}</span>
                        <span>{device.plate_number}</span>
                    </div>
                </div>
            }
            
        </div>
        </div>
        </>
        );
    } catch (error) {
        console.log(error);
        navigator(localStorage.getItem('previousPage'))
    }
}
export default HistoryGoogleMap;
