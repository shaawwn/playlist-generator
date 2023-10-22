import {useState, useEffect} from 'react';

function Search() {
    return(
        <div className="search top-items__wrapper">
            <h2>Search</h2>
            <input type="text" placeholder="Enter artist or track name"></input>
            <div className="search__results">
                <div className="search__results--tracks">

                </div>
                <div className="search__results--artists">

                </div>
            </div>
        </div>
    )
}


function SearchResult() {
    return(
        <div className="search__resilt">

        </div>
    )
}
export default Search