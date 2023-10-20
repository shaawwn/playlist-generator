import {useState, useEffect} from 'react';

function TrackTableRow({track, deviceId, play, pause, currentTrack, setCurrentTrack}) {
    // console.log("RENDERING WITH NO CURRENT TRACK? ", currentTrack)
    const [current, setCurrent] = useState('')

    function handleClick() {
        console.log("Clicking", track.uri)
        play(track)
        setCurrent('track-table__row--currently-playing') // can pass this JUST when clicking play
    }

    useEffect(() => {
    }, [deviceId])

    useEffect(() => {
        if(currentTrack) { // re-renders with no current
            // do nothuin

            if(currentTrack.uri !== track.uri) {
                setCurrent('')
            } else {
                console.log(currentTrack.uri === track.uri, track.uri)
                setCurrent('track-table__row--currently-playing')
            }
        } 
    }, [currentTrack])

    return(
        <div className={`track-table__row ${current}`} onClick={handleClick}>
            <span className="track-table__cell">{track.name}</span>
            <span className="track-table__cell">{track.album.name}</span>
            <span className="track-table__cell">{track.artists[0].name}</span>
            <span className="track-table__cell track-table__cell--align-right">{track.duration_ms}</span>
        </div>
    )
}

export default TrackTableRow;