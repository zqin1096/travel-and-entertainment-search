import React from 'react';
import classes from './ResultItem.module.css';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import {IoIosArrowForward} from 'react-icons/io';
import {connect} from 'react-redux';
import {addFavorite, removeFavorite} from '../../actions/favoriteAction';
import {IconContext} from "react-icons";
import {getPlace} from '../../actions/placeAction';

const ResultItem = (props) => {
    const isFavorite = props.favorites.favorites.find((favorite) => {
        return favorite.place_id === props.place.place_id;
    });

    const addFavorite = () => {
        props.addFavorite({
            category: props.place.icon,
            name: props.place.name,
            address: props.place.vicinity,
            place_id: props.place.place_id
        });
    };

    const removeFavorite = () => {
        props.removeFavorite(props.place.place_id);
    }
    return (
        <tr>
            <td className="align-middle"><strong>{props.index + 1}</strong></td>
            <td className="align-middle">
                <img src={props.place.icon} className={classes.resize}
                     alt="category"/>
            </td>
            <td className="align-middle" nowrap="nowrap">{props.place.name}</td>
            <td className="align-middle"
                nowrap="nowrap">{props.place.vicinity}</td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    {isFavorite ?
                        <IconContext.Provider
                            value={{
                                color: '#FED62F'
                            }}>
                            <AiFillStar onClick={removeFavorite}/>
                        </IconContext.Provider> :
                        <AiOutlineStar onClick={addFavorite}/>}
                </Button>
            </td>
            <td className="align-middle">
                <Button variant="light" className="border">
                    <IoIosArrowForward
                        onClick={() => props.getPlace(props.place.place_id)}/>
                </Button>
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    };
};

export default connect(mapStateToProps, {
    addFavorite,
    removeFavorite,
    getPlace
})(ResultItem);