import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import FavoriteItem from './FavoriteItem';
import Button from 'react-bootstrap/Button';

const Favorites = (props) => {
    const [page, setPage] = useState(1);

    const onNextPage = () => {
        setPage(page + 1);
    };

    const onPrevPage = () => {
        setPage(page - 1);
    };
    const totalPages = Math.floor((props.favorites.length - 1) / 20) + 1;
    // e.g: when the number of favorite places reduces from 21 to 20, return
    // to the previous page.
    if (page > totalPages) {
        setPage(totalPages);
    }

    return (
        <React.Fragment>
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
                {props.favorites.slice((page - 1) * 20, Math.min((props.favorites.length, (page - 1) * 20 + 20))).map((favorite, index) => {
                    return <FavoriteItem favorite={favorite} index={index}
                                         key={favorite.place_id}/>
                })}
                </tbody>
            </Table>
            <div className="text-center pb-5">
                <div>
                    {page > 1 &&
                    <Button
                        variant="light"
                        className="border mx-3"
                        onClick={onPrevPage}>
                        Previous
                    </Button>
                    }
                    {page < totalPages &&
                    <Button
                        variant="light"
                        className="border"
                        onClick={onNextPage}>
                        Next
                    </Button>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default Favorites;