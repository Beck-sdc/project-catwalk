/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile.jsx';
import ReviewButton from './ReviewButtons.jsx';
import {Col, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import "regenerator-runtime/runtime.js";

class ReviewsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            reviews: [],
            tiles: 2
        }
        this.getReviews = this.getReviews.bind(this)
        this.renderReviewsTiles = this.renderReviewsTiles.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentProduct.product_id !== prevProps.currentProduct.product_id) {
            this.getReviews()
        }
    }

    componentDidMount() {
        this.getReviews()
    }

    async getReviews() {
        const res = await axios(`/reviews/${this.props.currentProduct.product_id}`)
        const { data } = await res;
        this.setState({ reviews: data.results })
    }

    renderReviewsTiles() {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({ tiles: this.state.tiles += 2 })
    }
    // TODO: check to see if sorting persists (added: ...this.state)
    handleSort(e) {
        var {reviews} = this.state;
        var sortedReviews;
        if (e.target.value === "relevance") {
            sortedReviews = reviews.sort((a, b) => {
                if (a["helpfulness"] === b["helpfulness"]) {
                    return new Date(a["date"]) - new Date(b["date"]);
                }
                return b["helpfulness"] - a["helpfulness"]
            })
            this.setState({ ...this.state, reviews: sortedReviews })
        } else if (e.target.value === "newest") {
            sortedReviews = reviews.sort((a, b) => {
                return new Date(b["date"]) - new Date(a["date"])
            })
            this.setState({ ...this.state, reviews: sortedReviews })
        } else if (e.target.value === "helpful") {
            sortedReviews = reviews.sort((a, b) => {
                return b["helpfulness"] - a["helpfulness"]
            })
            this.setState({ ...this.state, reviews: sortedReviews })
        }
    }

    render() {
        // const {product_id} = this.props.currentProduct
        const {reviews, tiles} = this.state;

        if (reviews.length > 0) {
            return (
                <div data-testid="reviewsList">
                    <div className="reviewsList" >
                        <label>{reviews.length} review(s), sorted by
                            <select className="reviews-sort"
                                name="sort"
                                value={this.state.sort}
                                onChange={this.handleSort}
                            >
                                <option value="relevance" >Relevance</option>
                                <option value="newest" >Newest</option>
                                <option value="helpful" >Helpful</option>
                            </select>
                        </label>
                    <div className="reviewTiles" data-testid="rev-test">
                        { reviews.slice(0, tiles).map((review, i) => <ReviewTile review={review} key={i} /> )}
                    </div>
                    </div>
                    <div className="reviews-btn">
                        <Row xs="auto">
                            <Col>
                                { (reviews.length < 2) ? null : (reviews.length <= tiles) ? null : <Button type="button" onClick={this.renderReviewsTiles}>MORE REVIEWS</Button> }
                            </Col>
                            <Col>
                                <ReviewButton productId={this.props.currentProduct.product_id}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        } else {
            return (
                <div>No reviews for this product</div>
            )
        }
    }
}

// ReviewsList.propTypes = {
//     currentProduct: PropTypes.number.isRequired,
// }

export default ReviewsList;


// getReviews() {
//     axios.get(`/reviews/${this.props.currentProduct.product_id}`)
//         .then(results => this.setState({ reviews: results.data.results}))
//         .catch(err => console.error('Cannot retrieve reviews for product', err))
// }
// if (new Date(a.date) === new Date(b.date)) {
//     return b.helpfulness - a.helpfulness
// }
// return new Date(b.date) === new Date(a.date)