import React from 'react';
import classes from './ResultItem.module.css';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import {IoIosArrowForward} from 'react-icons/io';

const ResultItem = (props) => {
    return (
        <tr>
            <td className="align-middle"><strong>{props.index}</strong></td>
            <td className="align-middle">
                <img src={props.place.icon} className={classes.resize}
                     alt="category"/>
            </td>
            <td className="align-middle" nowrap="nowrap">{props.place.name}</td>
            <td className="align-middle"
                nowrap="nowrap">{props.place.vicinity}</td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <AiOutlineStar/>
                </Button>
            </td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <IoIosArrowForward/>
                </Button>
            </td>
        </tr>
    );
};

export default ResultItem;