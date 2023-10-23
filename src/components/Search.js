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
        console.log(e.target.value)
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
            <h2>Search</h2>
            <input type="text" placeholder="Enter artist or track name" onChange={handleChange}></input>
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

    const [trackDisplay, setTrackDisplay] = useState(true)
    const [artistDisplay, setArtistDisplay] = useState(false)
    const [active, setActive] = useState(false)
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

    function handleResultClick(e,label, id) {
        e.stopPropagation()
        console.log("TARGER", e.target)
        const newSeed = [label, id]
        // if result is already a seed, remove it
        // otherwise addseed
        if(active) {
            // addSeed(result)
            console.log("Removing seed", newSeed)
            setActive(false)
        } else {
            // removeSeed(result)
            console.log("Add seed", newSeed)
            setActive(true)
        }
    }


    useEffect(() => {

    }, [])

    useEffect(() => {
        if(active === true) {
            setCurrent('results-active')
        } else {
            setCurrent('')
        }
    }, [active])

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
                                seeds={seeds}
                                setSeeds={setSeeds}
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
                    />
                })}
                </div>
            }

        </div>
    )
}

function SearchResultRow({label, id, name, seeds, setSeeds}) {

    const [active, setActive] = useState(false)
    const [seed, setSeed] = useState([label, id])
    const [current, setCurrent] = useState('')

    function handleClick() {
        console.log('Clicking row', name)
        if(active === true) {
            console.log("Removing seed")
            // setActive(false)
            removeSeed()
        } else if(active === false) {
            console.log("Adding seed")
            // setActive(true)
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

    return(
        <div className={`search__results__row ${current}`} onClick={handleClick}>
            <p>{name}</p>
        </div>
    )
}
export default Search