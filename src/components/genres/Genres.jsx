import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

function Genres({data}) {
    const allGenres_attachedId = useSelector((state)=>state.home_store.genres_slice);

    
    return (
        <div className="genres">
            {data.map((id)=>{     ///đặt tên cho từng phần tử là id và tham chiếu đến từng phần tử của mảng
                ///nếu id trong arr có tồn tại trong allGenres_attachedId thì lấy
                if(!allGenres_attachedId[id]?.name) {     
                    return;
                }
                return (
                    <div className="genre" key={id}>
                        {allGenres_attachedId[id]?.name}
                    </div>
                );
            })}
        </div>
    );
}

export default Genres;