import {useState, useEffect} from 'react'

import TopItemHeader from './SeedsHeaderItem'

function SeedsHeader({seeds, setSeeds}) {
    console.log("SEEEEEDS", seeds, seeds.length)
    useEffect(() => {

    }, [seeds])

    return(
        <div className="seed-view__topbar__wrapper">
            <h2>seeds</h2>

            <div className="seed-view__topbar__current-seeds">
                {seeds.map((seed) => {
                    return <TopItemHeader 
                    seed={seed}
                    item={seed[2]}
                    id={seed[1]}
                    setSeeds={setSeeds}
                    seeds={seeds}
                    label={seed[0]}
                    key={seed[1] + 'seed-top'}
                    />
                })}
            </div>
        </div>
    )
}

export default SeedsHeader