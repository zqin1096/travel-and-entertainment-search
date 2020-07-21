import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './ReviewItem.module.css';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating';
import Container from 'react-bootstrap/Container';

const ReviewItem = (props) => {
    const date = moment.unix(props.review.time).format('YYYY-MM-DD HH:mm:ss');
    return (
        <Container fluid className="border my-2 pb-3">
            <Row>
                <Col lg={1} xs={2} className="mt-2">
                    <a href={props.review.author_url}
                       target="_blank"
                       rel="noopener noreferrer">
                        <img className={classes.roundImg}
                             style={{
                                 width: '100%',
                                 height: 'auto',
                                 objectFit: 'cover'
                             }}
                             src={props.review.profile_photo_url} alt=""/>
                    </a>
                </Col>
                <Col lg={11} xs={10} className="mt-2">
                    <Row className="text-info">
                        <a href={props.review.author_url}
                           target="_blank"
                           rel="noopener noreferrer">
                            <strong>{props.review.author_name}</strong>
                        </a>
                    </Row>
                    <Row className="text-secondary align-items-center">
                        <Rating className="mr-1"
                                size="small" value={props.review.rating}
                                precision={0.1} readOnly={true}/>
                        {date}
                    </Row>
                    <Row>
                        <Container fluid className={classes.review}>
                            {props.review.text}
                        </Container>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default ReviewItem;