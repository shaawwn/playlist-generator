import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TrackTable from './TrackTable';
import Navbar from './Navbar';

function RecommendationsView({recommendations}) {
    console.log("Recommendations", recommendations)

    useEffect(() => {

    }, [])
    
    return(
        <div className="recommendations-view">
            <Navbar />
            <TrackTable 
                tracks={recommendations}
            />
            <div className="webplayer">
                <h2>Webplayer</h2>
            </div>
        </div>
    )
}

export default RecommendationsView;