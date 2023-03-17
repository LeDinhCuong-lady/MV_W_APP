import React, { useState } from 'react';
import Container from '../../../components/container/Container';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';


function TopRated() {
    const [type, setType] = useState("movie");
    const {data: dataMovies, loading: loadingMovies} = UseFetch(`/${type}/top_rated`);


    const onTabChange_button = (props)=>{
        setType(props === "Movies"?"movie":"tv");
    }


    return (
        <div className="carouselSection">    {/*kế thừa style.scss từ file Home.jsx*/}
            <Container>
                <span className="carouselTitle">Top rated</span>    {/*span.carouselTitle*/}
                {/*nếu là components tự tạo thì có thể chuyến các props với tên gọi cho các thuộc tính tùy ý*/}
                {/*data là 1 thuộc tính với tên tự đặt*/}
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange_button={onTabChange_button} />
            </Container>
            <Slider data={dataMovies?.results} loading={loadingMovies} type={type} />     {/*results là tên đối tượng trong web*/}
        </div>
    );
}

export default TopRated;