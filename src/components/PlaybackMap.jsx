import React from 'react';
import HistoryGoogleMap from './HistoryGoogleMap';

function PlaybackMap({navigator, setShowBottomBar, currentTab, deviceData, setdeviceData, device  }) {
    const isMounted = React.useRef(false);
    let previousPage = localStorage.getItem('previousPage');

    React.useEffect(() => {
        isMounted.current = true;
              
        if (deviceData.length === 0) {
            if(isMounted.current){
                setTimeout(() => {
                    setShowBottomBar(true);
                    if (typeof previousPage === 'string') {
                        navigator(previousPage);
                    } else {
                        navigator('map')
                    }
                }, 10)
            }
            return null
        }

        return () => {
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
   
    if (isMounted.current) {
        setShowBottomBar(false);
    }
    
    return (
        <div className="art_main art_main_map art_main_map_playback"
        style={{position: 'relative'}}>
            <HistoryGoogleMap navigator={navigator} deviceData={deviceData} device={device}  />
        </div>
    );
}


export default PlaybackMap;
