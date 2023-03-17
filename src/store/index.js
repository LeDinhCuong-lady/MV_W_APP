// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDataFromAPI } from "../utils/api";
// import { getApiConfiguration } from "./homeSlice";

// function name() {
//     const dispatch = useDispatch();     ////sử dụng để thực thi các hành động (ví dụ: gọi hàm)
//     ////sd useSelector() để lấy dữ liệu của url_slice trong createSlice();
//     // const url_slice = useSelector((state)=>state.home_store.url_slice);
//     // console.log(url_slice?.total_pages);       ////đọc dữ liệu của url_slice


//     // useEffect(()=>{
//     //     fetchAPIConfig();         ///gọi hàm để thực thi hàm
//     // }, []);


//     const fetchAPIConfig = ()=>{
//         fetchDataFromAPI('/configuration').then((res)=>{      ///lấy dữ liệu về các thông tin cấu hình
//           console.log(res);
//           const baseURL_and_Size = {
//             backdrop_firstUrl: res.images.secure_base_url + 'original',
//             poster_firstUrl: res.images.secure_base_url + 'original',
//             profile_firstUrl: res.images.secure_base_url + 'original',
//           }
//           dispatch(getApiConfiguration(baseURL_and_Size));     ////gọi tới hàm để truyền dữ liệu
//         });
//     }
// }


// export default name;