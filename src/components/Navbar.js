import {useState, useEffect} from 'react';

function Navbar({recommendations}) {


    return(
        <div className="navbar">
            <button>Generate New Playlist</button>
            <button>Reset</button>
            <button>Save Playlist</button>
        </div>
    )
}

export default Navbar