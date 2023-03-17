import React from 'react';
import { useSelector } from "react-redux";
import "./style.scss";
import avatar from "../../../assets/avatar.png";
import Container from '../../../components/container/Container';
import Image from '../../../components/image/Image';



function Cast({data, loading}) {
    const url_slice = useSelector((state)=>state.home_store.url_slice);

    
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };


    return (
        <div className="castSection">
            <Container>
                <div className="sectionHeading">Top cast</div>
                {
                    !loading ? (
                        <div className="listItems">
                            {data?.map((castElement)=>{      ////đặt tên cho tưng phần tử là castElement
                                let img = castElement.profile_path?url_slice.profile_firstUrl + castElement.profile_path:avatar;
                                return (
                                    <div className="listItem" key={castElement.id}>
                                        <div className="profileImg">
                                            <Image src={img} />
                                        </div>
                                        <div className="name">{castElement.name}</div>
                                        <div className="character">{castElement.character}</div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="castSkeleton">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )
                }
            </Container>
        </div>
    );
}

export default Cast;