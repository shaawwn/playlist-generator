import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TrackTable from './TrackTable';
import Navbar from './Navbar';
import Webplayer from './Webplayer';
import {getTrackUris, shufflePlaylist} from '../utils/helpers'



function RecommendationsView({recommendations, accessToken}) {
    console.log("Recommendations", recommendations)
    const [playlist, setPlaylist] = useState([])

    function createPlaylist() {
        // create an array of track uris that can be passed to spotify to play.
        return getTrackUris(recommendations)
        
    }
    function play() {

    }

    function pause() {

    }

    function skip() {

    }

    function previous() {

    }

    useEffect(() => {
        let playlist = createPlaylist()

        let shuffledPlaylist = shufflePlaylist([...playlist])

        console.log(playlist == shuffledPlaylist)
   
    }, [])


    return(
        <div className="recommendations-view">
            <Navbar />
            <TrackTable 
                tracks={recommendations}
            />
            <Webplayer 
                accessToken={accessToken}
            />
        </div>
    )
}

export default RecommendationsView;