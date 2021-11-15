/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReviewsRating from './ReviewsRating.jsx';
import Helpful from './Helpful.jsx';
import {Image, Row, Col} from 'react-bootstrap';

const ReviewTile = props => {
    const [showMore, setShowMore] = useState(false)

    function GetFormattedDate() {
        let date = props.review.date.slice(0, 10).split('-');
        let months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let formattedDate = ` ${months[parseInt(date[1], 10)]} ${date[2]}, ${date[0]}`;
        return formattedDate;
    }
    
    return (
        <div className="review-Tile" data-testid="rev-tile-test" key={props.review.review_id}>
            <Row>
                <Col>
                    <ReviewsRating rating={props.review.rating}/>
                </Col>
                <Col xs={4}>
                    <div id="rev-user">
                        {props.review.verified ? <span>&#10003; </span> : null}
                        <span>
                            {props.review['reviewer_name']}, 
                        </span>
                        <span id="rev-date">
                            <GetFormattedDate />
                        </span>
                    </div>
                </Col>
                {/* <Col xs={2}>
                    <p id="rev-date">
                        <GetFormattedDate />
                    </p>
                </Col> */}
            </Row>
            <div id="rev-summary" style={{fontWeight: "bold", fontSize: "18px"}}>
                {props.review.summary}
            </div>
            <div id="rev-body" style={{fontSize: "13px"}}>
                {showMore ? props.review.body : `${props.review.body.substring(0, 250)}`}
                {props.review.body.length >= 250 ? 
                    <span id="show-rev-body" onClick={(e) => {
                        e.preventDefault()
                        setShowMore(!showMore)}}>
                            {showMore ? " show less" : "...show more"}
                    </span> : null}
            </div>
            {!props.review.recommend ? null : <p id="rev-rec">I recommend this product<span>&#10003;</span></p>}
            {props.review.response ? 
                <div 
                    id="rev-response" style={{fontWeight: "600"}}>Response from seller:
                    <p id="seller-response" style={{fontSize: "13px"}}>{props.review.response}</p>
                </div> 
            : null}
            {/* TODO: review photo */}
            {props.review.photos > 0 ? props.review.photos.map(photo => {
                // <div style={{ padding: "5px", margin: "5px" }}>
                    <Image
                        key={photo.id} 
                        src={photo.url} 
                        style={{ 
                            height: "100px", 
                            width: "100px",
                        }}
                    />
                // </div>
                }) : null}
            <Helpful helpfulness={props.review.helpfulness} reviewId={props.review.review_id} />
        </div>
    )
}

export default ReviewTile;

// function attachPhoto() {
//     props.review.photos.map(photo => {
//         <div style={{ padding: "5px", margin: "5px" }}>
//             <Image 
//                 key={photo.id} 
//                 photo={photo.url} 
//                 style={{ 
//                     height: "100px", 
//                     width: "100px",
//                 }}
//             />
//         </div>
//     })   
// } 