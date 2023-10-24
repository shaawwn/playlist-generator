import {useState, useEffect, useRef} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward, faVolumeHigh, faHeadphones } from '@fortawesome/free-solid-svg-icons'


function Webplayer({accessToken, setDeviceId, play, pause, resume, skip, previous, currentTrack, setCurrentTrack, playing, recommendations, generatePlaylist, reset, resetPlaylist, savePlaylist}) {

    // const [player, setPlayer] = useState(undefined)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);

    const player = useRef(null)

    function handleReset() {
        reset()
        resetPlaylist()
    }

    function handlePlaylistReroll() {
        reset()
        resetPlaylist()
        generatePlaylist()
    }
    function disconnectPlayer() {
        player.current.removeListener('ready', player._eventListeners.ready[0])
        player.current.removeListener('not_ready', player._eventListeners.not_ready[0])
        player.current.disconnect()
        // setPlayer(undefined)
    }

    useEffect(() => {

        if(player.current) {
            // so the problem here is that player doesn't exist in react, but it still has a spotify isntance on the spotify servers
            disconnectPlayer()
        }
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            player.current = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 1
            });

            // setPlayer(player);

            player.current.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id)
            });

            player.current.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.current.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setPaused(state.paused);
            
                player.current.getCurrentState().then( state => { 
                    // (!state)? setActive(false) : setActive(true)
                    if(state === null) {
                        setActive(false)
                    } else if(state !== null) {
                        setActive(true)
                        setCurrentTrack(state.track_window.current_track)
                    }
                });
            
            }));
            player.current.connect();

        };

        return () => {
            if(player.current) {
                player.current.disconnect().then(() => console.log("Disconnected"))
            } else {
                console.log("There is no player instance.", player)
            }
        }    
    }, []);

    useEffect(() => {

    }, [currentTrack])


    return(
        <div className="webplayer">
            <div className="webplayer__wrapper">
                <div className="webplayer__details webplayer__wrapper--item">
                    {currentTrack ? 
                        <>
                            <div className="webplayer__album">
                                <img src={currentTrack.album.images[1].url} alt="album cover" className="webplayer__album__image">

                                </img>
                            </div>
                            <div className="webplayer__details__song__details">
                                <div className="webplayer__now-playing">
                                    <p>{currentTrack.name}</p>
                                </div>
                                <div className="webplayer__artist">
                                    <p>{currentTrack.artists[0].name}</p>
                                </div>
                            </div>
                        </>
                    :<span></span>
                    }
                </div>
                <div className="webplayer__controls webplayer__wrapper--item">
                    <FontAwesomeIcon className="webplayer__controls__btn" icon={faBackward} size="3x" />
                    {/* {currentTrack} */}

                    {playing ? <FontAwesomeIcon className="webplayer__controls__btn" icon={faPause} size="3x" onClick={pause}/> 
                    : <FontAwesomeIcon className="webplayer__controls__btn" icon={faPlay} size="3x" onClick={resume}/>
                    }
                    
                    <FontAwesomeIcon className="webplayer__controls__btn" icon={faForward} size="3x" onClick={skip}/>
                </div>
                {/* <div className="webplayer__options webplayer__wrapper--item">
                    <FontAwesomeIcon icon={faHeadphones} size="3x"/>
                    <FontAwesomeIcon icon={faVolumeHigh} size="3x"/>      
                </div> */}
                <div className="webplayer__buttons">
                <button className="navbar__btn btn" onClick={generatePlaylist}>Reroll</button>
                <button className="navbar__btn btn" onClick={handleReset}>Reset</button>
                <button className="navbar__btn btn" onClick={savePlaylist}>+ Playlist</button>            
            </div>
            </div>

        </div>
    )
}

export default Webplayer;