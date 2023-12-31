import {useState, useEffect} from 'react';
import TrackTableRow from './TrackTableRow';
import { v4 as uuidv4 } from 'uuid';


function TrackTable({tracks, deviceId, play, resume, pause, currentTrack, setCurrentTrack, playing}) {

    return(
        <div className="track-table">
            {tracks.map(track => {
                // return <p key={uuidv4()}>{track.name} by {track.artists[0].name} {track.duration_ms}</p>
                return <TrackTableRow 
                    track={track}
                    deviceId={deviceId}
                    play={play}
                    resume={resume}
                    pause={pause}
                    currentTrack={currentTrack}
                    setCurrentTrack={setCurrentTrack}
                    playing={playing}
                    key={track.id}
                />
            })}
        </div>
    )
}

export default TrackTable;