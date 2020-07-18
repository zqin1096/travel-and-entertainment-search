import React, {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ReviewItem from './ReviewItem';
import Alert from 'react-bootstrap/Alert';

const Reviews = (props) => {
    const [review, setReview] = useState('Google Reviews');
    const [order, setOrder] = useState('Default Order');
    const selectedReviews = review === 'Google Reviews' ? props.googleReviews : props.yelpReviews;
    if (selectedReviews && selectedReviews.length > 0) {
        // Sort the reviews based on the selected order.
        if (order === 'Highest Rating') {
            selectedReviews.sort((review1, review2) => {
                return review2.rating - review1.rating;
            });
        } else if (order === 'Lowest Rating') {
            selectedReviews.sort((review1, review2) => {
                return review1.rating - review2.rating;
            });
        } else if (order === 'Most Recent') {
            selectedReviews.sort((review1, review2) => {
                return review2.time - review1.time;
            });
        } else if (order === 'Least Recent') {
            selectedReviews.sort((review1, review2) => {
                return review1.time - review2.time;
            });
        } else {
            selectedReviews.sort((review1, review2) => {
                return review1.default_order - review2.default_order;
            });
        }
    }
    return (
        <Container fluid style={{padding: 0}}>
            <Row className="mt-3">
                <DropdownButton
                    title={review}
                    variant="secondary">
                    <Dropdown.Item
                        eventKey="Google Reviews"
                        onSelect={(key) => setReview(key)}>
                        Google Reviews
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="Yelp Reviews"
                        onSelect={(key) => setReview(key)}>
                        Yelp Reviews
                    </Dropdown.Item>
                </DropdownButton>

                <DropdownButton
                    title={order}
                    variant="secondary"
                    className="mx-2">
                    <Dropdown.Item
                        eventKey="Default Order"
                        onSelect={(key) => setOrder(key)}>
                        Default Order
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="Highest Rating"
                        onSelect={(key) => setOrder(key)}>
                        Highest Rating
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="Lowest Rating"
                        onSelect={(key) => setOrder(key)}>
                        Lowest Rating
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="Most Recent"
                        onSelect={(key) => setOrder(key)}>
                        Most Recent
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="Least Recent"
                        onSelect={(key) => setOrder(key)}>
                        Lowest Recent
                    </Dropdown.Item>
                </DropdownButton>
            </Row>
            {selectedReviews && selectedReviews.length > 0 ?
                <Row className="mt-3">
                    {selectedReviews.map((review, index) => {
                        return <ReviewItem key={index} review={review}/>
                    })}
                </Row> :
                <Alert variant="warning" className="mt-3">
                    No record.
                </Alert>
            }
        </Container>
    )
};

export default Reviews;