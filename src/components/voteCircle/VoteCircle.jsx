import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";


function VoteCircle(props) {
    const vote_average = props.vote_average;


    return (
        <div className="circleRating">
            <CircularProgressbar 
                value={vote_average}
                maxValue={10}
                text={vote_average}
                styles={buildStyles({
                    pathColor: vote_average < 5 ? "red" : vote_average < 7 ? "orange" : "green"
                })}
            />
        </div>
    );
}

export default VoteCircle;