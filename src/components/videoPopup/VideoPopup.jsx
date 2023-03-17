import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

function VideoPopup({showPopup, setShowPopup, videoKey, setVideoKey}) {
    const hidePopup = ()=>{
        setShowPopup(false);
        setVideoKey(null);
    }


    return (
        <div className={`videoPopup ${showPopup?"visible":""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>Close</span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoKey}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
}

export default VideoPopup;
