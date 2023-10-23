import {useState, useEffect, useRef} from 'react';

function Search({accessToken, setSeeds, seeds, searchState, setSearchState}) {


    const delay = useRef()
    const queryString = useRef()
    const [trackResults, setTrackResults] = useState()
    const [artistResults, setArtistResults] = useState()

    function resetSearch() {
        setTrackResults()
        setArtistResults()
    }

    function search(query) {

        fetch(`https://api.spotify.com/v1/search?query=$${query}&type=artist,track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log("Search results", data)
            setTrackResults(data.tracks)
            setArtistResults(data.artists)
            setSearchState(true)
        })
    }

    function handleSearch() {
        if(queryString.current === '') {
            if(delay.current) {
                clearTimeout(delay.current)
            }
            setTrackResults()
            setArtistResults()
            setSearchState(false)
            return false
        }

        if(delay.current) {
            clearTimeout(delay.current) 
        }

        delay.current = setTimeout(() => search(queryString.current), 500)
    }

    function handleChange(e) {
        e.stopPropagation()
        queryString.current = e.target.value
        handleSearch(queryString.current)
    }

    useEffect(() => {

    }, [trackResults, artistResults])

    useEffect(() => {

        if(searchState === false) {
            resetSearch()
        }
    }, [searchState])

    return(
        <div className="search top-items__wrapper">
            <h2>search</h2>
            <input type="text" placeholder="Enter artist or track name" onChange={handleChange} className="search__input"></input>
            {trackResults && artistResults ?
                <SearchResult 
                    artists={artistResults.items}
                    tracks={trackResults.items}
                    seeds={seeds}
                    setSeeds={setSeeds}
                />
                :<span></span>
            }
        </div>
    )
}


function SearchResult({artists, tracks, seeds, setSeeds, label, id}) {
    console.log("Reloading results")
    const [trackDisplay, setTrackDisplay] = useState(true) // so this was here to display tracks by default
    const [artistDisplay, setArtistDisplay] = useState(false)
    const [seed, setSeed] = useState([label, id])
    const [current, setCurrent] = useState('')

    function handleButtonClick(queryType) {
        if(queryType === 'artists') {
            setTrackDisplay(false)
            setArtistDisplay(true)
        } else if(queryType === 'track') {
            setTrackDisplay(true)
            setArtistDisplay(false)
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [artists, tracks])

    return(
        <div className="search__results">
            <div className="search__results__buttons">
                <button className="search__results__btn" onClick={() => handleButtonClick('track')}>Tracks</button>
                <button className="search__results__btn" onClick={() => handleButtonClick('artists')}>Artists</button>
            </div>
            {trackDisplay ? 
                    <div className={`search__results--tracks`}>
                        {tracks.map((track) => {
                            return <SearchResultRow 
                                label={'track'}
                                id={track.id}
                                name={track.name}
                                artist={track.artists[0].name}
                                seeds={seeds}
                                setSeeds={setSeeds}
                                seed={['track', track.id, track.name]}
                            />
                        })}
                    </div>
            :            
                <div className={`search__results--tracks ${current}`}>
                {artists.map((artist) => {
                    return <SearchResultRow 
                        label={'artist'}
                        id={artist.id}
                        name={artist.name}
                        seeds={seeds}
                        setSeeds={setSeeds}
                        seed={['artist', artist.id, artist.name]}
                    />
                })}
                </div>
            }

        </div>
    )
}

function SearchResultRow({label, id, name, artist, seeds, setSeeds, seed}) {

    const [active, setActive] = useState(false)
    // const [seed, setSeed] = useState([label, id])
    const [current, setCurrent] = useState('')

    function handleClick() {
        if(active === true) {
            removeSeed()
        } else if(active === false) {
            addSeed()
        }
    }

    function addSeed(e) {
        if(seeds.length < 5) {
            setSeeds([...seeds, seed])
            setActive(true)
        } else {
            console.log(seeds.length, seeds)
            alert("Cannot add anymore seeds", seeds)
        }
    }

    function removeSeed(e) {
        const newSeeds = [...seeds]
        newSeeds.splice(seeds.indexOf(seed), 1)
        setSeeds(newSeeds)
        setActive(false)
    }


    useEffect(() => {

        if(active === true) {
            setCurrent('results-active')
        } else if(active === false) {
            setCurrent('')
        }
    }, [active])

    useEffect(() => {
        // if(active === true) {
        //     console.log("ID AND NAME", id, name)
        // }
        setActive(false) // this resets style, however
        
        // all of this ignores that what I WANT to happen is that this refreshes and creates a new row with the search result, when what is happening is that it is NOT reloading with a new row and for some reason is just replacing the id/name visually, but not state
    }, [id, name])

    return(
        <div className={`search__results__row ${current}`} onClick={handleClick}>
            {artist !== undefined ? 
               <div className="search__results__row__track">
                <p className="search__results__row__main">{name}</p>
                <p className="search__results__row__sub">{artist}</p>
               </div> 
            :<p className="search__results__row__main">{name}</p>
            }
        </div>
    )
}
export default Search