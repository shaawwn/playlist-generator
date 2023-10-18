import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { v4 as uuidv4 } from 'uuid';

import {getTopArtistGenres, getTopArtists, getTopTracks, countGenres, sortTopGenres} from '../utils/helpers'
function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [topGenres, setTopGenres] = useState()
    const [topGenreCount, setTopGenreCount] = useState()
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [recommendations, setRecommendations] = useState()

    function generatePlaylist() {
        console.log("Generating playlist")
    }
    useEffect(() => {
        // get user details
        if(!accessToken) return

        fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log("User data", data)
            const [genreList, genreSet] = getTopArtistGenres(data.items)
            setTopGenres(genreList)
            setTopGenreCount(sortTopGenres(countGenres(genreList, genreSet)))
            setTopArtists(getTopArtists(data.items))
        })
    }, [accessToken])

    useEffect(() => {
        if(!accessToken) return

        fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("top track data", data)
            //
            setTopTracks(getTopTracks(data.items))
        })
    }, [accessToken])

    useEffect(() => {
        if(!topGenres || !topArtists || !topTracks) return //      
        // console.log("Top artists: ", topArtists.slice(0, Object.keys(topArtists).length - 1).map(artist => artist.id).toString())
        // console.log("Top tracks: ", topTracks.slice(0, Object.keys(topTracks).length - 1).map(track => track.id).toString())
        // topArtists.slice(0, 1).map(artist => artist.id).toString()
        // topTracks.slice(0, 1).map(track => track.id).toString()
        //
        // fetch(`https://api.spotify.com/v1/recommendations?seed_genres=&seed_artists=${topArtists.slice(0, 1).map(artist => artist.id).toString()}&seed_tracks=${topTracks.slice(0, 1).map(track => track.id).toString()}
        // `, {
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`
        //     }
        // }).then((response) => response.json())
        // .then((data) => {
        //     console.log(getTopTracks(data.tracks))
        //     setRecommendations(getTopTracks(data.tracks))
        // })
        // .catch((err) => {
        //     console.log("There was an error", err)
        // })
    }, [topGenres, topArtists, topTracks])


    return (
        <div className="dashboard">
            <button onClick={generatePlaylist}>Generate Playlist</button>
            {topGenres ? <div className="top-items">
                {topGenreCount ? 
                    <div className="top-items--list">
                        <h2>Genres</h2>
                        {topGenreCount.map((genre) => {
                            return <p>{genre}</p>
                        })}
                    </div>
                    :<h1>Loading...</h1>
                }
                {topTracks ? 
                    <div className="top-items--list">
                        <h2>Tracks</h2>
                        {topTracks.map(track => {
                            return <p>{track.name} by {track.artist}</p>
                        })}
                    </div>
                    :<h1>Loading...</h1>
                }
                {topArtists ?
                    <div className="top-items--list">
                        <h2>Artists</h2>
                        {topArtists.map(artist => {
                            return <p>{artist.name}</p>
                        })}
                    </div>
                    :<h1>Loading...</h1>
                }
            </div>
            :<h2>Nothing</h2>    
        }
            {recommendations ?
                <>  
                    <h1>Here's your new playlist!</h1>
                    {recommendations.map(track => {
                        return <p key={uuidv4()}>{track.name} by {track.artist}</p>
                    })}
                </>
                 
                 :<h1>Loading playlist...</h1>}
        </div>
    )
}

export default Dashboard