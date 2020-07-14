import React from 'react';
import {connect} from 'react-redux';
import {removeFavorite} from '../../actions/favoriteAction';
import classes from '../result/ResultItem.module.css';
import Button from 'react-bootstrap/Button';
import {IoIosArrowForward} from 'react-icons/io';
import {FaTrashAlt} from 'react-icons/fa';

const FavoriteItem = (props) => {
    const removeFavorite = () => {
        props.removeFavorite(props.favorite);
    };
    return (
        <tr>
            <td className="align-middle"><strong>{props.index + 1}</strong></td>
            <td className="align-middle">
                <img src={props.favorite.icon} className={classes.resize}
                     alt="category"/>
            </td>
            <td className="align-middle"
                nowrap="nowrap">{props.favorite.name}</td>
            <td className="align-middle"
                nowrap="nowrap">{props.favorite.vicinity}</td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <FaTrashAlt onClick={removeFavorite}/>
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

export default connect(null, {removeFavorite})(FavoriteItem);