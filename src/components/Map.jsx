import React from 'react';
import ReactGoogleMap from './ReactGoogleMap';

function Map({navigator, setviewDevice, currentTab, setCurrentMapDevice}) {

    return (
        <div className="art_main art_main_map"
        style={{position: 'relative', width: '100%', height: '100%'}}>
        
            <ReactGoogleMap navigator={navigator} setviewDevice={setviewDevice} currentTab={currentTab} setCurrentMapDevice={setCurrentMapDevice} />
        </div>
    );
}


export default Map;
