import {useState, useEffect} from 'react';
import SeedsHeader from './SeedsHeader'
import Search from './Search';
import TopItemsContainer from './TopItemsContainer';
import TopItem from './TopItem';



function SeedView({accessToken, handleGeneratePlaylistClick, resetSeeds, seeds, setSeeds, topArtists, topTracks, searchState, setSearchState}) {
    const [screenWidth, setScreenWidth] = useState()

    useEffect(() => {

        if(!screenWidth) {
            let screenSize = window.innerWidth
            setScreenWidth(screenSize)
            window.addEventListener('resize', () => {
                screenSize = window.innerWidth
                setScreenWidth(screenSize)
            })
        }

    }, [])

    function addButtons() {
        return(
            <div className="seed-view__topbar__buttons">
                <button onClick={handleGeneratePlaylistClick} className="navbar__btn btn">Generate Playlist</button> 
                <button onClick={resetSeeds} className="navbar__btn btn navbar__btn--sub">Reset</button>
            </div>
        )
    }
    function addTopbar() {
        return(
        <div className="seed-view__topbar">
            {screenWidth > 421 ? addButtons() : <span></span>}
                <div className="seed-view__topbar__current-seeds">
                    {seeds.length > 0 ?
                        <>
                            <SeedsHeader 
                                seeds={seeds}
                                setSeeds={setSeeds}
                            />
                        </>
                    :<p style={{'fontSize': '1.3rem'}}>Select items from below or search tracks and artists to generate a playlist.</p>
                    }
                </div>
        </div>
        )
    }

    function displaySeedView() {
        return(
            <div className="seed-view">
                {addTopbar()}
                {topArtists ? <div className="top-items">
                    <Search 
                        accessToken={accessToken}
                        setSeeds={setSeeds}
                        seeds={seeds}
                        searchState={searchState}
                        setSearchState={setSearchState}
                    />
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
                    {/* {screenWidth < 421 ? addButtons() :<span></span>} */}
                </div>

                :<h2>Nothing</h2>}
                {screenWidth < 421 ? addButtons() :<span></span>}
            </div>
        )
    }


    return (
        displaySeedView()
    )
}

export default SeedView