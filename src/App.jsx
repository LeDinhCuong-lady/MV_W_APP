import { useEffect, useState } from 'react'
import { fetchDataFromAPI } from './utils/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResults from './pages/searchResults/SearchResults';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';



function App() {
    const dispatch = useDispatch();     ////sử dụng để thực thi các hành động (ví dụ: gọi hàm)
    ////sd useSelector() để lấy dữ liệu của url_slice trong createSlice();
    const url_slice = useSelector((state)=>state.home_store.url_slice);
    // console.log(url_slice?.total_pages);       ////đọc dữ liệu của url_slice


    useEffect(()=>{
      fetchAPIConfig();         ///gọi hàm để thực thi hàm
      genresCall();
    }, []);


    const fetchAPIConfig = ()=>{    ///hàm lấy dữ liệu về các thông tin cấu hình
      fetchDataFromAPI('/configuration').then((res)=>{
        console.log(res);
        const baseURL_and_Size = {
          backdrop_firstUrl: res.images.secure_base_url + 'original',
          poster_firstUrl: res.images.secure_base_url + 'original',
          profile_firstUrl: res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(baseURL_and_Size));     ////gọi tới hàm để truyền dữ liệu
      });
    }


    const genresCall = async()=>{    ///lấy thể loại và id mỗi thể loại
      let promises = [];
      let typeArr = ["tv", "movie"];
      let allGenres_attachedId = {};     ///đối tượng

      typeArr.forEach((type)=>{
        ////lấy 2 mảng thể loại của tv và movie và lưu vào promises
        promises.push(fetchDataFromAPI(`/genre/${type}/list`))
      });
      const dataGenres = await Promise.all(promises);
      console.log(dataGenres);

      // truy cập tới đối tượng genres trong web; lần lượt duyệt qua từng phần tử
      ///[{genres: [{}, {},...]}, {genres: [{}, {},...]}] tương ứng với các chỉ mục index là 0, 1
      dataGenres.map(({genres})=>{  
        return genres.map((genreElement)=>(allGenres_attachedId[genreElement.id] = genreElement));
      });
      // console.log(allGenres_attachedId);
      dispatch(getGenres(allGenres_attachedId));    ///lưu vào genres_slice
    }


    return (
      <BrowserRouter>
          <Header />
          <Routes>
            {/* tạo các tuyến đường route liên kết đến các file; không nên đặt các route tương tự nhau*/}
            <Route exact path='/' element={<Home />} />      {/*localhost:5173/*/}
            <Route exact path='/:type/:id' element={<Details />} />
            <Route exact path='/search/:query_tukhoa' element={<SearchResults />} />
            <Route exact path='/explore_khampha/:type' element={<Explore />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    )
}

export default App
