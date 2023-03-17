import React, { useState } from 'react';
import Container from '../../../components/container/Container';
import Image from '../../../components/image/Image';
import PlayIcon from '../../../components/playIcon/PlayIcon';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import './style.scss';

function VideosSection({data, loading}) {
    const [showPopup, setShowPopup] = useState(false);
    const [videoKey, setVideoKey] = useState(null);


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };


    return (
        <div className="videosSection">
            <Container>
                <div className="sectionHeading">Official video</div>
                {
                    !loading ? (
                        <div className="videos">
                            {data?.results?.map((resultElement)=>(
                                <div 
                                    className="videoItem" 
                                    key={resultElement.id} 
                                    onClick={()=>{
                                        setShowPopup(true)
                                        setVideoKey(resultElement.key)
                                    }}
                                >
                                    <div className="videoThumbnail">
                                        <Image
                                            src={`https://img.youtube.com/vi/${resultElement.key}/mqdefault.jpg`}
                                        />
                                        <PlayIcon/>
                                    </div>

                                    <div className="videoTitle">{resultElement.name}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )
                }
            </Container>

            <VideoPopup 
                showPopup={showPopup} 
                setShowPopup={setShowPopup} 
                videoKey={videoKey} 
                setVideoKey={setVideoKey} 
            />

        </div>
    );
}

export default VideosSection;
