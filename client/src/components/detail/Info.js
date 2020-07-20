import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Rating from '@material-ui/lab/Rating';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Info = (props) => {
    // show will be set to true if open hours modal is clicked.
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dayOfWeek = (index) => {
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index];
    }

    let openingHours;
    let schedule = [];
    if (props.place.opening_hours) {
        // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for
        // Thursday, 5 for Friday, 6 for Saturday.
        const day = new Date().getDay();
        // weekday_text[0] -> Monday.
        const today_text = props.place.opening_hours.weekday_text[(day + 6) % 7];
        openingHours = today_text.split('day:')[1];

        let current = day;
        for (let i = 0; i < 7; i++) {
            schedule.push([dayOfWeek((current + 6) % 7), props.place.opening_hours.weekday_text[(current + 6) % 7].split('day:')[1]]);
            current++;
        }
    }
    return (
        <Table striped responsive="lg" className="mt-3">
            <tbody>
            {
                props.place.formatted_address ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Address</td>
                        <td style={{width: '70%'}}
                            nowrap="nowrap">
                            {props.place.formatted_address}
                        </td>
                    </tr> : null
            }
            {
                props.place.international_phone_number ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Phone
                            Number
                        </td>
                        <td style={{width: '70%'}}
                            nowrap="nowrap">
                            {props.place.international_phone_number}
                        </td>
                    </tr> : null
            }
            {
                props.place.price_level ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Price Level
                        </td>
                        <td style={{width: '70%'}}
                            nowrap="nowrap">{'$'.repeat(props.place.price_level)}
                        </td>
                    </tr> : null
            }
            {
                props.place.rating ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Rating</td>
                        <td style={{width: '70%'}}
                            nowrap="nowrap">
                            <span
                                className="align-middle">{props.place.rating} </span>
                            <Rating className="align-middle"
                                    size="small" value={props.place.rating}
                                    precision={0.1} readOnly={true}/>
                        </td>
                    </tr> : null
            }
            {
                props.place.url ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Google Page
                        </td>
                        <td style={{width: '70%'}} nowrap="nowrap">
                            <a href={props.place.url}
                               target="_blank"
                               rel="noopener noreferrer">
                                {props.place.url}
                            </a>
                        </td>
                    </tr> : null
            }
            {
                props.place.website ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Website</td>
                        <td style={{width: '70%'}} nowrap="nowrap">
                            <a href={props.place.website}
                               target="_blank"
                               rel="noopener noreferrer">
                                {props.place.website}
                            </a>
                        </td>
                    </tr> : null
            }
            {
                props.place.opening_hours ?
                    <tr>
                        <td style={{width: '30%'}} nowrap="nowrap">Hours</td>
                        <td style={{width: '70%'}} nowrap="nowrap">
                            {props.place.opening_hours.isOpen() ? `Open now:${openingHours}` : 'Closed'}
                            <a href=""
                               className="ml-3"
                               onClick={(event => {
                                   event.preventDefault();
                                   handleShow();
                               })}>
                                Daily open hours
                            </a>
                        </td>
                    </tr> : null
            }
            </tbody>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Open hours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {schedule.map((day, index) => {
                            return (
                                index === 0 ?
                                    <Row className="border-top py-2"
                                         key={index}>
                                        <Col xs={4}><strong>{day[0]}</strong>
                                        </Col>
                                        <Col><strong>{day[1]}</strong>
                                        </Col>
                                    </Row> :
                                    <Row className="border-top py-2"
                                         key={index}>
                                        <Col xs={4}>{day[0]}</Col>
                                        <Col>{day[1]}</Col>
                                    </Row>
                            )
                        })}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Table>
    );
};

export default Info;