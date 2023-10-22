import {useState, useEffect} from 'react';

function TrackTableRow({track, deviceId, play, resume, pause, currentTrack, setCurrentTrack, playing}) {
    // console.log("RENDERING WITH NO CURRENT TRACK? ", currentTrack)
    const [current, setCurrent] = useState('')
    const [active, setActive] = useState(false) // going by uri === uri alone will cause same songs but different uris (eng vs japanese versions for example) to be 'different' so need to set active song to determine css styling

    function handleClick() {
        if(playing) {
            // pause current song on click
            if(currentTrack) {
                if(currentTrack.uri !== track.uri) {
                    play(track)
                } else {
                    pause()
                }
            }
        } else {
            // check if the clicked song is the same as currentlyPlaying, if it is, resume
            if(currentTrack) {
                if(currentTrack.uri !== track.uri) {
                    play(track)
                } else {
                    resume()
                }
            } else {
                play(track)
            }
            
        }
        // play(track)
        setCurrent('track-table__row--currently-playing') // can pass this JUST when clicking play
    }

    useEffect(() => {
    }, [deviceId])

    useEffect(() => {
        if(currentTrack) { // re-renders with no current
            if(currentTrack.uri !== track.uri) {
                setCurrent('')
            } else {
                setCurrent('track-table__row--currently-playing')
            }
        } 

    }, [currentTrack])

    useEffect(() => {

    }, [playing])

    useEffect(() => {
        if(active) {
            // set the style to highligh the track
            setCurrent('track-table__row--currently-playing')
        } else {
            setCurrent('')
        }
    }, [active])

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