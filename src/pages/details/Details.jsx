import React from 'react';
import { useParams } from 'react-router-dom';
import UseFetch from '../../hooks/UseFetch';
import Cast from './cast/Cast';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Recommendation from './slider/Recommendation';
import Similar from './slider/Similar';
import './style.scss';
import VideosSection from './videosSection/VideosSection';

function Details() {
    const {type, id} = useParams();

    
    ///đặt đúng với các tên mà UseFetch() đã trả về
    const {data: dataVideosByMovieId, loading: loadingVideosByMovieId} = UseFetch(`/${type}/${id}/videos`);    ///lấy video cho phim theo id phim

    
    ///diễn viên và đoàn làm phim theo id của phim; có thể sd tên khác cho data và loading
    // đối tượng credits gồm 2 thuộc tính là 2 mảng và 2 mảng đó có thể bao gồm nhiều mảng khác
    /// {cast: [{}], crew: [{}, {},...], id: 505642}
    const {data: dataCreditsByMovieId, loading: loadingCreditsByMovieId} = UseFetch(`/${type}/${id}/credits`);    

    
    return (
        <div>
            {/*lấy phần tử có index là 0 của mảng; nhiều mảng có thể null nên phải sd dấu ?*/}
            <DetailsBanner data={dataVideosByMovieId?.results?.[0]} dataCrew={dataCreditsByMovieId?.crew} />
            <Cast data={dataCreditsByMovieId?.cast} loading={loadingCreditsByMovieId} />
            <VideosSection data={dataVideosByMovieId} loading={loadingVideosByMovieId} />
            <Similar type={type} id={id} />
            <Recommendation type={type} id={id} />
        </div>
    );
}

export default Details;