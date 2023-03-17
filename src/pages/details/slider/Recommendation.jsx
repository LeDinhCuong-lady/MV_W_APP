import React from 'react';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';

function Recommendation({type, id}) {
    const {data: dataMovies, loading: loadingMovies, error} = UseFetch(`/${type}/${id}/recommendations`);
    
    
    return (
        <Slider
            data={dataMovies?.results}
            loading={loadingMovies}
            type={type}
            title="Recommendations"
        />
    );
}

export default Recommendation;