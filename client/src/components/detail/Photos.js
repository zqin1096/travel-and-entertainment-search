import React from 'react';
import classes from './Photos.module.css';
import Card from 'react-bootstrap/Card';

const Photos = (props) => {
    return (
        <div className={`card-columns ${classes.columnCount}`}>
            {props.photos.map((photo, index) => {
                return (
                    <Card
                        key={index}
                        className={`border rounded px-1 py-1 my-1`}>
                        <a href={photo.getUrl()} target="_blank"
                           rel="noopener noreferrer">
                            <img src={photo.getUrl()} alt="default" style={{
                                height: 'auto%',
                                width: '100%',
                                objectFit: 'cover'
                            }}/>
                        </a>

                    </Card>
                )
            })}
        </div>
    )
};

export default Photos;