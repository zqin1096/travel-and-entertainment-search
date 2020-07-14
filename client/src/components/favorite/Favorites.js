import React from 'react';
import Table from 'react-bootstrap/Table';
import FavoriteItem from './FavoriteItem';

const Favorites = (props) => {
    return (
        <Table responsive="lg" size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Category</th>
                <th>Name</th>
                <th>Address</th>
                <th>Favorite</th>
                <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {props.favorites.map((favorite, index) => {
                return <FavoriteItem favorite={favorite} index={index}
                                     key={favorite.id}/>
            })}
            </tbody>
        </Table>
    );
};

export default Favorites;