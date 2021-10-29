import React from 'react';
import ReactGoogleMap from './ReactGoogleMap';

function Map({currentTab, setCurrentMapDevice}) {

    return (
        <div className="art_main art_main_map"
        style={{position: 'relative', width: '100%', height: '100%'}}>
        
            <ReactGoogleMap currentTab={currentTab} setCurrentMapDevice={setCurrentMapDevice} />
        </div>
    );
}


export default Map;
