import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../../../hooks/UseFetch';
import './style.scss';
import Image from '../../../components/image/Image';
import Container from '../../../components/container/Container';



function HeroBanner() {
    const [backdrop, setBackdrop] = useState("");
    const [query_tukhoa, setQuery_tukhoa] = useState("");   ///thiết lập trạng thái ban đầu cho "query_tukhoa" là rỗng
    const navigate = useNavigate();     ///điều hướng
    const {data: dataMovies, loading: loadingMovies} = UseFetch('/movie/upcoming');     ///lấy dữ liệu từ API
    const url_slice = useSelector((state)=>state.home_store.url_slice);


    useEffect(()=>{     ///useEffect dùng để đồng bộ hóa với hệ thống bên ngoài
        ////results và backdrop_path là các tên trong duyệt web
        const backdrop_path = dataMovies?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        const backdrop_fullUrl = url_slice.backdrop_firstUrl + backdrop_path;
        setBackdrop(backdrop_fullUrl);
    }, [dataMovies]);


    const searchHandle = (event)=>{
        if((event.key === "Enter") && query_tukhoa.length > 0) {
            ///nếu phím nóng = Enter và từ khóa tìm kiếm > 0 thì điều hướng về SearchResult.jsx
            navigate(`/search/${query_tukhoa}`);
        }
    }


    return (
        <div className="heroBanner">

            {
                !loadingMovies &&
                <div className="backdrop-img">
                    <Image src={backdrop} />
                </div>
            }

            <div className="opacity-layer"></div>

            <Container>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Millions of movie, TV shows and people
                        to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        {/*onKeyUp dùng để thiết lập phím nóng*/}
                        {/*khi đầu vào thay đổi sẽ kích hoạt sự kiện onChange() để lấy giá trị đầu vào*/}
                        <input type="text" placeholder="Search for a movie or tv show..."
                            onChange={(e)=>setQuery_tukhoa(e.target.value)} onKeyUp={searchHandle} />
                        <button>Search</button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HeroBanner;