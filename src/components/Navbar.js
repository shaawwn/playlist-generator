import {useState, useEffect} from 'react';

function Navbar({recommendations, generatePlaylist, reset, resetPlaylist, savePlaylist}) {

    function handleReset() {
        reset()
        resetPlaylist()
    }
    return(
        <div className="navbar">
            <button className="navbar__btn btn" onClick={generatePlaylist}>Generate New Playlist</button>
            <button className="navbar__btn btn" onClick={handleReset}>Reset</button>
            <button className="navbar__btn btn" onClick={savePlaylist}>Save Playlist</button>
        </div>
    )
}

export default Navbar