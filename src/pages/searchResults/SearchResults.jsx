import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import "./style.scss";
import UseFetch from "../../hooks/UseFetch";
import noResults from '../../assets/no-results.png';
import Container from '../../components/container/Container';
import { fetchDataFromAPI } from '../../utils/api';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import Image from '../../components/image/Image';



function SearchResult() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const {query_tukhoa} = useParams();


    const fetchDataIntinial = ()=>{
        setLoading(true);
        fetchDataFromAPI(`/search/multi?query=${query_tukhoa}&page=${pageNum}`).then((res)=>{
            setData(res)
            setPageNum((prev)=>prev + 1)    ///tăng 1 cho page
            setLoading(false)
        });
    }


    const fetchDataNextPage = ()=>{    ///next page
        fetchDataFromAPI(`/search/multi?query=${query_tukhoa}&page=${pageNum}`).then((res)=>{
            if(data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results]
                });
            } else {
                setData(res);
            }
            setPageNum((prev)=>prev + 1);
        });
    }


    useEffect(()=>{
        setPageNum(1)
        fetchDataIntinial();
    }, [query_tukhoa]);

    
    return (
        <div className="searchResultsPage">
            {
                loading && <Spinner initial={true} />
            }
            {
                !loading && (
                    <Container>
                        {
                            data?.results?.length > 0 ? (
                                <>
                                    <div className="pageTitle">
                                        {`Search ${data?.total_results > 1?"results":"result"} of ${query_tukhoa}`}
                                    </div>
                                    <InfiniteScroll
                                        className="content"
                                        dataLength={data?.results?.length || []}
                                        next={fetchDataNextPage}
                                        hasMore={pageNum <= data?.total_pages}
                                        loader={<Spinner/>}
                                    >
                                        {data?.results?.map((resultElement)=>{
                                            ///không lấy type là person để tránh lỗi của details
                                            if(resultElement.media_type === "person") {
                                                return;
                                            }
                                            return (
                                                /*duyệt qua từng bản ghi(mảng) và truyền cho MovieCard*/
                                                <MovieCard key={resultElement.id} data={resultElement} fromSearch={false} />
                                            )
                                        })}
                                    </InfiniteScroll>
                                </>
                            ) : (
                                <>
                                    <div className="resultNotFound">
                                        <span>Sorry, results not found !!!</span>
                                        <img src={noResults} />
                                    </div>
                                </>
                            )
                        }
                    </Container>
                )
            }
        </div>
    );
}

export default SearchResult;