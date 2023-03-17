import axios from 'axios';


const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;


const headers = {Authorization: 'bearer ' + TMDB_TOKEN}     ////thiết lập headers trong Application của web


export const fetchDataFromAPI = async(url_last, params)=>{    ////tạo hàm dùng để lấy các dữ liệu từ API
    try {
        ////queryString_headers là các string query trong api
        const {data} = await axios.get(BASE_URL + url_last, {headers, params});     ///lấy dữ liệu
        return data;    ////trả về dữ liệu
    } catch(err) {
        console.log(err);
        return err;
    }
}