import React from 'react';
import Table from 'react-bootstrap/Table';
import ResultItem from './ResultItem';

const Results = (props) => {
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
            {props.places.map((place, index) => {
                return <ResultItem place={place} index={index} key={place.id}/>
            })}
            </tbody>
        </Table>
    );
};

export default Results;