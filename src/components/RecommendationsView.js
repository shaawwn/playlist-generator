import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TrackTable from './TrackTable';
import Navbar from './Navbar';
import Webplayer from './Webplayer';
import {getTrackUris, shufflePlaylist} from '../utils/helpers'



function RecommendationsView({recommendations, accessToken, generatePlaylist, reset, userID}) {
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

    function savePlaylist() {
        // save the playlist to user's spotify account

        // save the playlist using API

        // after/inside the returned fetch request, make another request to ADD ITEMS using the list of track uris [spotify:track:id]
        // with the playlist ID

        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                'name': 'My generated playlist',
                'description': 'Made with playlist generator',
                'public': true,
            })
        }).then((response) => response.json()).then((data) => {
            // data.id will be the playlist ID to use
            console.log("CREATED PLAYLIST DATA", data)
            fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    'uris': playlist
                })
            }).then(response => {
                if(!response.status === 201) {
                    throw new Error('There was an error adding items to playlist')
                }
                response.json()
            }).then((data) => {
                console.log("Items added to playlist")
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    function resetPlaylist() {
        setPlaylist([])
        setCurrentTrack()
        setPlaylist(false)
        pause()
    }
    function setFirstTrack(trackId) {
        // If not shuffled, then START palylist from index of first track, then it will play sequentially
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

        // pause() // there's a fraction of a second audio at the start of some songs, maybe because it is trying to play another song before switchin?

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
        fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.status === 204) {
                throw new Error("Error skipping track")
            }
        }).then(() => {
            console.log("Skipping") 
            // no need to setCurrentTrack
        }).catch((err) => {
            console.log(err)
        }) 
    }

    function previous() {
        fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.status === 204) {
                throw new Error("Error going to previous track")
            }
        }).then(() => {
            console.log("Going to previous") 
            // no need to setCurrentTrack
        }).catch((err) => {
            console.log(err)
        }) 
    }

    useEffect(() => {
        // let playlist = createPlaylist()
        setPlaylist(createPlaylist())
        let shuffledPlaylist = shufflePlaylist([...playlist])


        // get user device ID

    }, [])

    return(
        <div className="recommendations-view">
            <Navbar 
                generatePlaylist={generatePlaylist}
                reset={reset}
                resetPlaylist={resetPlaylist}
                savePlaylist={savePlaylist}
            />
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
                resume={resume}
                pause={pause}
                skip={skip}
                previous={previous}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                playing={playing}
                recommendations={recommendations}
            />
        </div>
    )
}

export default RecommendationsView;