import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import UseFetch from '../../../hooks/UseFetch';
import Genres from '../../../components/genres/Genres';
import VoteCircle from '../../../components/voteCircle/VoteCircle';
import Image from "../../../components/image/Image";
import PosterFallback from "../../../assets/no-poster.png";
import Container from '../../../components/container/Container';
import PlayIcon from '../../../components/playIcon/PlayIcon';
import "./style.scss";
import VideoPopup from "../../../components/videoPopup/VideoPopup";



function DetailsBanner(props) {
    const data = props.data;
    const dataCrew = props.dataCrew;
    

    ////sử dụng useParams() để nhận biết các tham số của route trong App.jsx; đặt tên phải khớp với các tham số của route
    const {type, id} = useParams();
    const {data: dataMovieById, loading: loadingMovieById} = UseFetch(`/${type}/${id}`);   ///lấy dữ liệu của phim theo id
    const url_slice = useSelector((state)=>state.home_store.url_slice);
    ///map() tạo ra 1 mảng mới sau khi duyệt hết lần lượt các phần tử và gán mảng đó cho genreArrByMovieId
    const dataGenresId = dataMovieById?.genres?.map((genreElement)=>genreElement.id);   ///chỉ lấy id chứ ko lấy name


    ///lọc lấy những mảng có job là Director
    /// crew = [0{}, 1{}, 2{},...]; nếu không đc đặt tên thì sẽ đc đánh số bằng chỉ mục index
    const dataDirector = dataCrew?.filter((f)=>f.job === "Director");
    const dataWriter = dataCrew?.filter((f)=>f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

    
    const [showPopup, setShowPopup] = useState(false);
    const [videoKey, setVideoKey] = useState(null);


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {!loadingMovieById ? (
                <>
                    {
                        !!dataMovieById &&
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Image src={url_slice.backdrop_firstUrl + dataMovieById.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <Container>
                                <div className="content">
                                    <div className="left">
                                        {
                                            dataMovieById.poster_path?(
                                                <Image className="posterImg" src={url_slice.poster_firstUrl + dataMovieById.poster_path} />
                                            ):(
                                                <Image className="posterImg" src={PosterFallback} />
                                            )
                                        }
                                    </div>

                                    <div className="right">
                                        <div className="title">
                                            {
                                                `${dataMovieById.name || dataMovieById.title} (${dayjs(dataMovieById?.release_date).format('YYYY')})`
                                            }
                                        </div>
                                        <div className="subtitle">
                                            {dataMovieById.tagline}
                                        </div>

                                        <Genres data={dataGenresId} />

                                        <div className="row">
                                            <VoteCircle vote_average={dataMovieById.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={()=>{setVideoKey(data?.key), setShowPopup(true)}}>
                                                <PlayIcon />
                                                <span className="text">Watch trailer</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">
                                                {dataMovieById.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {    
                                                ///nếu có trả về status thì hiển thị
                                                dataMovieById.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Status: </span>
                                                        <span className="text">{dataMovieById.status}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                dataMovieById.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Release date: </span>
                                                        <span className="text">{dayjs(dataMovieById.release_date).format('DD/MM/YYYY')}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                dataMovieById.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Runtime: </span>
                                                        <span className="text">{toHoursAndMinutes(dataMovieById.runtime)}</span>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        {
                                            // > 0 tức là 1 tập bản ghi(mảng) trở lên
                                            dataDirector?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Director: </span>
                                                    <span className="text">
                                                        {/*vì là các thuộc tính không có tên nên sẽ lấy index làm key*/}
                                                        {dataDirector?.map((d, index)=>(
                                                            // console.log(d.name)
                                                            <span key={index}>
                                                                {d.name}
                                                                {/*số lượng phần tử của mảng(độ dài) - 1*/}
                                                                {dataDirector.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        {
                                            dataWriter?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Writer: </span>
                                                    <span className="text">
                                                        {/*vì là các thuộc tính không có tên nên sẽ lấy index làm key*/}
                                                        {dataWriter?.map((w, index)=>(
                                                            // console.log(w.name)
                                                            <span key={index}>
                                                                {w.name}
                                                                {/*số lượng phần tử của mảng(độ dài) - 1*/}
                                                                {dataWriter.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        {
                                            dataMovieById?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Creator: </span>
                                                    <span className="text">
                                                        {/*vì là các thuộc tính không có tên nên sẽ lấy index làm key*/}
                                                        {dataMovieById?.created_by?.map((c, index)=>(
                                                            // console.log(d.name)
                                                            <span key={index}>
                                                                {c.name}
                                                                {/*số lượng phần tử của mảng(độ dài) - 1*/}
                                                                {dataMovieById?.created_by.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <VideoPopup 
                                    showPopup={showPopup} 
                                    setShowPopup={setShowPopup} 
                                    videoKey={videoKey} 
                                    setVideoKey={setVideoKey} 
                                />
                            
                            </Container>
                        </React.Fragment>
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Container>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default DetailsBanner;