/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Helpful = ({helpfulness, reviewId}) => {
    const [helpful, setHelpful] = useState(helpfulness)
    const [click, setClick] = useState(false)

    // TODO: useEffect
    useEffect( () => {
        setHelpful(helpful)
    }, [helpful])


    const updateHelpful = e => {
        e.preventDefault()

        if (!click) {
            return axios.put(`/reviews/${reviewId}/helpful`, { review_id: `${reviewId}`})
                .then(res => {
                    console.log(res.data)
                    setHelpful(helpful + 1)
                    setClick(true)
                })
                .catch(err => {
                    if (err.res) {
                        console.log(err.res.data)
                    }
                })
        }
    }

    const reportReview = e => {
        e.preventDefault()
        if (!click) {
            return axios.put(`/reviews/${reviewId}/report`, { review_id: `${reviewId}`})
                .then(() => setClick(true))
                .catch(err => console.log('Cannot report review.', err))
        }
    }

    return (
        <div>
            <div id="review-helpful">Helpful?
                <a  id="review-answer"
                    href="#"
                    value="yes"
                    onClick={updateHelpful}
                >Yes
                </a>({helpful})
                <span> | </span>
                <a  id="review-answer"
                    href="#"
                    value="reportReview"
                    onClick={reportReview}
                >Report
                </a>
            </div>
        </div>
    )
}

export default Helpful;



// const updateHelpful = e => {
//     e.preventDefault()
//     if (!click) {
//         return axios.put(`/reviews/${reviewId}/helpful`, { review_id: `${reviewId}`})
//             .then(res => {
//                 console.log(res.data)
//                 setHelpful(helpful + 1)
//                 setClick(true)
//             })
//             .catch(err => {
//                 if (err.res) console.log(err.response.data)
//             })
//     }
// }
{/* <a
    href="#"
    style={{margin: "2px", padding: "2px"}}
    value="no"
    onClick={updateHelpful}
>No
</a>({notHelpful}) */}