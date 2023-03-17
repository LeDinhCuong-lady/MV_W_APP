import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api";


function UseFetch(url_last) {             /////bước trung gian để thiết lập trước khi sử dụng fetchDataFromAPI() lấy dữ liệu
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(null);
        const [error, setError] = useState(null);

        useEffect(() => {
            setLoading("loading...");
            setData(null);
            setError(null);

            fetchDataFromAPI(url_last)       ////lấy dữ liệu
                .then((res) => {
                    setLoading(false);
                    setData(res);           ////set dữ liệu
                })
                .catch((err) => {
                    setLoading(false);
                    setError("Something went wrong!!!");
                });
        }, [url_last]);

        return { data, loading, error };    ///trả về dữ liệu
}

export default UseFetch;
