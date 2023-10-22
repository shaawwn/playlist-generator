import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { v4 as uuidv4 } from 'uuid';

import {getTopArtistGenres, getTopArtists, getTopTracks, countGenres, sortTopGenres, generatePlaylist} from '../utils/helpers'
import TopItemsContainer from './TopItemsContainer'
import RecommendationsView from './RecommendationsView'
import Search from './Search';


function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [user, setUser] = useState()
    const [topGenres, setTopGenres] = useState()
    const [topGenreCount, setTopGenreCount] = useState()
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [recommendations, setRecommendations] = useState()
    const [refresh, setRefresh] = useState(false)

    const [seeds, setSeeds] = useState([]) // genres, tracks, artists

    function generateFromTopItems() {
        console.log("Generating from top items", seeds)
        generatePlaylist(
            topGenres[0], 
            topArtists.slice(0, 1).map(artist => artist.id).toString(), 
            topTracks.slice(0, 1).map(track => track.id).toString(), 
            accessToken, 
            setRecommendations
        )
    }

    function _formatGenreSeeds(genreSeeds) {
        // when there is a space in a genre, ex. 'hard rock', spotify adds a hyphen for genre seeds, ex 'hard-rock'
        let formattedSeeds = []
        genreSeeds.forEach((seed) => {
            console.log("Format seed", seed)
            formattedSeeds.push(seed.split(" ").join("-"))
        })
        return formattedSeeds
    }

    function handleGeneratePlaylistClick() {
        resetSeeds() // this is close, but it resets the app temporarily when it shuld just reset recommendations
        // need to 'reset' playback, or pass it an empty list or something
        let genre_seeds = seeds.filter((seed) => seed[0] === 'genre').map(seed => seed[1])
        let track_seeds = seeds.filter((seed) => seed[0] === 'track').map(seed => seed[1]).toString()
        let artist_seeds = seeds.filter((seed) => seed[0] === 'artist').map(seed => seed[1]).toString()
        
        genre_seeds = _formatGenreSeeds(genre_seeds).toString()

        // If there are NO items selected, genreate automatically from top Items
        if(genre_seeds.length === 0 && track_seeds.length === 0 && artist_seeds.length === 0) {
            console.log("Generating automatically", seeds)
            generateFromTopItems()
        } else {
            generatePlaylist(genre_seeds, artist_seeds, track_seeds, accessToken, setRecommendations)
        }
    }
    
    function reset() {
        setSeeds([])
        setRecommendations()
    }

    function resetSeeds() {
        setSeeds([])
        if(recommendations) {
            setRecommendations([]) 
        } else {
            setRecommendations()
        }
    }


    function displaySeedView() {
        return(
            <div className="seed-view">
            {topGenres ? <div className="top-items">
                {/* Top Genres */}
                {/* {topGenreCount ? 
                    <TopItemsContainer 
                        items={topGenreCount}
                        label={'genre'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                } */}
                <Search />
                {/* Top Tracks */}
                {topTracks ? 
                    <TopItemsContainer 
                        items={topTracks}
                        label={'track'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                }
                {/* Top Artists */}
                {topArtists ? 
                    <TopItemsContainer 
                        items={topArtists}
                        label={'artist'}
                        setSeeds={setSeeds}
                        seeds={seeds}
                    />
                    :<h2>Loading</h2>
                }
            </div>

            :<h2>Nothing</h2>}
                <button onClick={handleGeneratePlaylistClick} className="navbar__btn btn">Generate Playlist</button> 
                <button onClick={resetSeeds} className="navbar__btn btn">Reset</button>
                {recommendations ? <button className="navbar__btn btn">Save Playlist</button>:<span></span>}
        </div>
        )
    }

    // useEffect(() => {
    //     if(!accessToken) return

    //     // get user data

    // }, [accessToken])

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

        fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("USER DATA", data.id)
            setUser(data)
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
            // console.log("top track data", data)
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
        // generatePlaylist(
        //     '', 
        //     topArtists.slice(0, 1).map(artist => artist.id).toString(), 
        //     topTracks.slice(0, 1).map(track => track.id).toString(), 
        //     accessToken, 
        //     setRecommendations
        // )

    }, [topGenres, topArtists, topTracks])



    return (
        <div className="dashboard">
            {recommendations ?
                <>  
                    <RecommendationsView 
                        recommendations={recommendations}
                        accessToken={accessToken}
                        generatePlaylist={handleGeneratePlaylistClick}
                        reset={reset}
                        refresh={resetSeeds}
                        userID={user.id}
                    />
                </>
                
                :displaySeedView()}
            
        </div>
    )
}

export default Dashboard