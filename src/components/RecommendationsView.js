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
    const [playing, setPlaying] = useState(false) // 
    const [currentlyPlaying, setCurrentlyPlaying] = useState()  // use this for play/pause


    function createPlaylist() {
        // create an array of track uris that can be passed to spotify to play.
        return getTrackUris(recommendations)
        
    }

    function setFirstTrack(trackId) {

        // on clicking a track, put that track at the front of the list of tracks to play.
        const indexOfTrack = playlist.indexOf(trackId)
        let modPlaylist = [...playlist]
        const track = modPlaylist.splice(indexOfTrack, 1)
        modPlaylist.unshift(track[0])
        return modPlaylist
    }
    
    function resume() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(!response.status === 204) {
                throw new Error()
            } 
        }).then((data) => {
            // console.log("Playback started", track.uri)
            // console.log("Setting current track to: ", track)
            // setCurrentTrack(track)
            setPlaying(true)
        }).catch((err) => {
            console.log("Error on playback start", err)
        })
    }
    function play(track) {
        // track.id (I should set currentTrack to the full track object so I can use it)

        const uris = setFirstTrack(track.uri)

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
            console.log("Playback started", track.uri)
            console.log("Setting current track to: ", track)
            setCurrentTrack(track)
            setPlaying(true)
        }).catch((err) => {
            console.log("Error on playback start", err)
        })
    }

    function pause() {
        fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.status === 204) {
                throw new Error()
            }
        }).then(() => {
            console.log("Pausing")
            setPlaying(false)
        }).catch((err) => {
            console.log("Error pausing track", err)
        })
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

    return(
        <div className="recommendations-view">
            <Navbar />
            <TrackTable 
                tracks={recommendations}
                deviceId={deviceId}
                play={play}
                resume={resume}
                pause={pause}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                playing={playing}
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