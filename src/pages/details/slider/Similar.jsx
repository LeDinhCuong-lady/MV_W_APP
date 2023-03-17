import React from 'react';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';



function Similar({type, id}) {
    const {data: dataMovies, loading: loadingMovies, error} = UseFetch(`/${type}/${id}/similar`);
    const title = type === "tv" ? "Similar TV Shows" : "Similar movie";
    

    return (
        <Slider
            data={dataMovies?.results}
            loading={loadingMovies}
            type={type}
            title={title}
        />
    );
}

export default Similar;