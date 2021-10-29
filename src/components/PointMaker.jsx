import React from 'react';

function PointMaker({ text, Icon,status, rotation, speed, lat, lng, device, map, maps}) {
    return (
            <div className="art_map_marker" >
                <span className="art_icon_wrapper">
                    {typeof Icon === 'object' && <Icon />}
                </span>
            </div>
        );
}

export default PointMaker;
