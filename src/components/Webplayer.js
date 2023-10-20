import {useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward, faVolumeHigh, faHeadphones } from '@fortawesome/free-solid-svg-icons'


function Webplayer({accessToken, setDeviceId, play, pause, skip, previous, currentTrack, setCurrentTrack}) {
    const [player, setPlayer] = useState(undefined)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);



    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setDeviceId(device_id)
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setPaused(state.paused);
            
                player.getCurrentState().then( state => { 
                    // (!state)? setActive(false) : setActive(true)
                    if(state === null) {
                        setActive(false)
                    } else if(state !== null) {
                        setActive(true)
                        setCurrentTrack(state.track_window.current_track)
                    }
                });
            
            }));
            player.connect();

        };

        
    }, []);



    return(
        <div className="webplayer">
            <div className="webplayer__wrapper">
                <div className="webplayer__details webplayer__wrapper--item">
                    <div className="webplayer__album">
                        <p>Album cover</p>
                    </div>
                    <div className="webplayer__now-playing">
                        <p>Now Playing</p>
                    </div>
                    <div className="webplayer__artist">
                        <p>Artist</p>
                    </div>
                </div>
                <div className="webplayer__controls webplayer__wrapper--item">
                    <FontAwesomeIcon icon={faBackward} size="5x"/>
                    <FontAwesomeIcon icon={faPlay} size="5x"/>
                    <FontAwesomeIcon icon={faForward} size="5x"/>
                </div>
                <div className="webplayer__options webplayer__wrapper--item">
                    <FontAwesomeIcon icon={faHeadphones} size="5x"/>
                    <FontAwesomeIcon icon={faVolumeHigh} size="5x"/>      
                </div>
            </div>
        </div>
    )
}

export default Webplayer;