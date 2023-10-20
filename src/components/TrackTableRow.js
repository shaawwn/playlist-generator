import {useState, useEffect} from 'react';

function TrackTableRow({track}) {

    return(
        <div className="track-table__row">
            <span className="track-table__cell">{track.name}</span>
            <span className="track-table__cell">{track.album.name}</span>
            <span className="track-table__cell">{track.artists[0].name}</span>
            <span className="track-table__cell track-table__cell--align-right">{track.duration_ms}</span>
        </div>
    )
}

export default TrackTableRow;