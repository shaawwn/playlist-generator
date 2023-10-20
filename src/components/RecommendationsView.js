import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TrackTable from './TrackTable';
import Navbar from './Navbar';
import Webplayer from './Webplayer';
import {getTrackUris, shufflePlaylist} from '../utils/helpers'



function RecommendationsView({recommendations, accessToken}) {
    // console.log("Recommendations", recommendations)
    const [playlist, setPlaylist] = useState([])
    const [deviceId, setDeviceId] = useState()
    const [currentTrack, setCurrentTrack] = useState()

    function createPlaylist() {
        // create an array of track uris that can be passed to spotify to play.
        return getTrackUris(recommendations)
        
    }

    function setFirstTrack(trackId) {

        // on clicking a track, put that track at the front of the list of tracks to play.
        const indexOfTrack = playlist.indexOf(trackId)
        let modPlaylist = [...playlist]
        const track = modPlaylist.splice(indexOfTrack, 1)
        // modPlaylist = shufflePlaylist(modPlaylist)
        modPlaylist.unshift(track[0])
        // setPlaylist(modPlaylist) // I don't think I really need to setState for this...
        return modPlaylist
    }

    function play(trackId) {

        const uris = setFirstTrack(trackId)
        // on clicking a track, it should start to play the playlist with THAT TRACK as the first
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'uris': uris
            })
        }).then((response) => {
            if(!response.status === 204) {
                throw new Error()
            } 
        }).then((data) => {
            console.log("Playback started")
        }).catch((err) => {
            console.log("Error on playback start", err)
        })
    }

    function pause() {

    }

    function skip() {

    }

    function previous() {

    }

    useEffect(() => {
        // let playlist = createPlaylist()
        setPlaylist(createPlaylist())
        let shuffledPlaylist = shufflePlaylist([...playlist])


        // get user device ID

    }, [])

    // useEffect(() => {

    // }, [deviceId])


    return(
        <div className="recommendations-view">
            <Navbar />
            <TrackTable 
                tracks={recommendations}
                deviceId={deviceId}
                play={play}
                pause={pause}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
            />
            <Webplayer 
                accessToken={accessToken}
                setDeviceId={setDeviceId} // set Device AFTER webplayer has loaded.
                play={play}
                pause={pause}
                skip={skip}
                previous={previous}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
            />
        </div>
    )
}

export default RecommendationsView;