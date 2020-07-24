import React from 'react';
import {connect} from 'react-redux';
import {removeFavorite} from '../../actions/favoriteAction';
import {getPlace} from '../../actions/placeAction';
import classes from '../result/ResultItem.module.css';
import Button from 'react-bootstrap/Button';
import {IoIosArrowForward} from 'react-icons/io';
import {FaTrashAlt} from 'react-icons/fa';

const FavoriteItem = (props) => {
    const removeFavorite = () => {
        props.removeFavorite(props.favorite.place_id);
    };
    return (
        <tr>
            <td className="align-middle"><strong>{props.index + 1}</strong></td>
            <td className="align-middle">
                <img src={props.favorite.category} className={classes.resize}
                     alt="category"/>
            </td>
            <td className="align-middle"
                nowrap="nowrap">{props.favorite.name}</td>
            <td className="align-middle"
                nowrap="nowrap">{props.favorite.address}</td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <FaTrashAlt onClick={removeFavorite}/>
                </Button>
            </td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <IoIosArrowForward
                        onClick={() => props.getPlace(props.favorite.place_id)}/>
                </Button>
            </td>
        </tr>
    );
};

export default connect(null, {removeFavorite, getPlace})(FavoriteItem);