import data from '../playlist.json';
import { Fragment, React } from "react";
import './HomePage.css';
const PlayList = (props) => {    

    const listItems = data.map((data_one, index) => (
    <Fragment key={index}>
        <li>
            <span>{data_one.prgName}</span>
            <span>{data_one.PlayTime}</span>
            <span>{data_one.prgColumn}</span>
        </li>
    </Fragment>
    ));

    return (
            <ul>{listItems}</ul>
        )


}

export default PlayList;