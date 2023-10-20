import {useState, useEffect} from 'react';

function TrackTableRow({track, deviceId, play, pause, currentTrack, setCurrentTrack}) {


    function handleClick() {
        console.log("Clicking", track.uri)
        play(track.uri)
    }

    useEffect(() => {
        // console.log("DeviceId", deviceId)
    }, [deviceId])


    return(
        <div className="track-table__row" onClick={handleClick}>
            <span className="track-table__cell">{track.name}</span>
            <span className="track-table__cell">{track.album.name}</span>
            <span className="track-table__cell">{track.artists[0].name}</span>
            <span className="track-table__cell track-table__cell--align-right">{track.duration_ms}</span>
        </div>
    )
}

export default TrackTableRow;