import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PosterFallback from "../../assets/no-poster.png";
import Genres from '../genres/Genres';
import Image from '../image/Image';
import VoteCircle from '../voteCircle/VoteCircle';
import dayjs from "dayjs";
import './style.scss';



function MovieCard({data, fromSearch, type}) {
    const url_slice = useSelector((state)=>state.home_store.url_slice);
    const navigate = useNavigate();
    const poster = data.poster_path?url_slice.poster_firstUrl + data.poster_path:PosterFallback;


    return (
        <div className="movieCard" onClick={()=>navigate(`/${data.media_type ||  type}/${data.id}`)}>
            <div className="posterBlock">
                <Image className="posterImg" src={poster} />
                {
                    fromSearch && (      ////fromSearch true
                        <React.Fragment>
                            <VoteCircle vote_average={data.vote_average.toFixed(1)} />
                            <Genres data={data.genre_ids.slice(0, 2)} />
                        </React.Fragment>
                    )
                }
            </div>

            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format('DD/MM/YYYY')}
                </span>
            </div>
        </div>
    );
}

export default MovieCard;