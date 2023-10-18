import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { v4 as uuidv4 } from 'uuid';

import {getTopArtistGenres, getTopArtists, getTopTracks, countGenres, sortTopGenres, generatePlaylist} from '../utils/helpers'
import TopItemsContainer from './TopItemsContainer'
import TopItem from './TopItem'



function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [topGenres, setTopGenres] = useState()
    const [topGenreCount, setTopGenreCount] = useState()
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [recommendations, setRecommendations] = useState()

    const [seeds, setSeeds] = useState([]) // genres, tracks, artists

    function handleGeneratePlaylistClick() {
        console.log("Generating playlist on click")
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
        generatePlaylist(
            '', 
            topArtists.slice(0, 1).map(artist => artist.id).toString(), 
            topTracks.slice(0, 1).map(track => track.id).toString(), 
            accessToken, 
            setRecommendations
        )

    }, [topGenres, topArtists, topTracks])


    return (
        <div className="dashboard">
            <button onClick={handleGeneratePlaylistClick}>Generate Playlist</button> 
            {topGenres ? <div className="top-items">
                {/* Top Genres */}
                {topGenreCount ? 
                    <TopItemsContainer 
                        items={topGenreCount}
                        label={'genre'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                }
                {/* Top Tracks */}
                {topTracks ? 
                    <TopItemsContainer 
                        items={topTracks}
                        label={'tracks'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                }
                {/* Top Artists */}
                {topArtists ? 
                    <TopItemsContainer 
                        items={topArtists}
                        label={'artists'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                }
            </div>
            // {topGenres ? <div className="top-items">
            //     {topGenreCount ? 
            //         <div className="top-items--list">
            //             <h2>Genres</h2>
            //             {topGenreCount.map((genre) => {
            //                 return <p key={uuidv4()}>{genre}</p>
            //             })}
            //         </div>
            //         :<h1>Loading...</h1>
            //     }
            //     {topTracks ? 
            //         <div className="top-items--list">
            //             <h2>Tracks</h2>
            //             {topTracks.map(track => {
            //                 return <p key={uuidv4()}>{track.name} by {track.artist}</p>
            //             })}
            //         </div>
            //         :<h1>Loading...</h1>
            //     }
            //     {topArtists ?
            //         <div className="top-items--list">
            //             <h2>Artists</h2>
            //             {topArtists.map(artist => {
            //                 return <p key={uuidv4()}>{artist.name}</p>
            //             })}
            //         </div>
            //         :<h1>Loading...</h1>
            //     }
            // </div>
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