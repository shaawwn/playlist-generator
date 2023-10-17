import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'

import {getTopArtistGenres, getTopArtists, getTopTracks} from '../utils/helpers'
function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [topGenres, setTopGenres] = useState()
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [recommendations, setRecommendations] = useState()

    useEffect(() => {
        // get user details
        if(!accessToken) return

        fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("User data", data)
            const [genreList, genreSet] = getTopArtistGenres(data.items)
            setTopGenres(genreList)
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
        // console.log("Top Genres: ", topGenres.slice)
        // console.log("Top artists: ", topArtists.slice(0, 5).map(artist => artist.id).toString())
        // console.log("Top tracks: ", topTracks.slice(0, 5).map(track => track.id).toString())
        fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${topArtists.slice(0, 1).map(artist => artist.id).toString()}&seed_tracks=${topTracks.slice(0, 1).map(track => track.id).toString()}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log("Recommended based on Top Items:", data)
            console.log(getTopTracks(data.tracks))
            setRecommendations(getTopTracks(data.tracks))
        })
    }, [topGenres, topArtists, topTracks])


    return (
        <div className="dashboard">
            {topGenres ? <h1>Top genres and artists gotten</h1>:<h1>Loading...</h1>}
            {recommendations ?
                <>  
                    <h1>Here's your new playlist!</h1>
                    {recommendations.map(track => {
                        return <p>{track.name} by {track.artist}</p>
                    })}
                </>
                 
                 :<h1>Loading playlist...</h1>}
        </div>
    )
}

export default Dashboard