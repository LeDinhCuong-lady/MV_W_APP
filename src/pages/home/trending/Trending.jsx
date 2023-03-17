import React, { useState } from 'react';
import Container from '../../../components/container/Container';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';


function Trending() {
    const [time_window, setTime_window] = useState("day");
    /// {page: 1, results: [{}, {},...], total_pages: 1000, total_results: 2000}
    const {data: dataMovies, loading: loadingMovies} = UseFetch(`/trending/all/${time_window}`);  ///all bao gồm các thể loại khác nhau
    console.log(dataMovies)


    const onTabChange_button = (props)=>{
        setTime_window(props === "Day"?"day":"week");
    }


    return (
        <div className="carouselSection">    {/*kế thừa style.scss từ file Home.jsx*/}
            <Container>
                <span className="carouselTitle">Trending</span>    {/*span.carouselTitle*/}
                {/*nếu là components tự tạo thì có thể chuyến các props với tên gọi cho các thuộc tính tùy ý*/}
                {/*data là 1 thuộc tính với tên tự đặt*/}
                <SwitchTabs data={["Day", "Week"]} onTabChange_button={onTabChange_button} />
            </Container>
            <Slider data={dataMovies?.results} loading={loadingMovies} />     {/*results là tên đối tượng trong web*/}
        </div>
    );
}

export default Trending;