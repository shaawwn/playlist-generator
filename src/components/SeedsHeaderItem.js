import {useState, useEffect} from 'react'

import TopItem from './TopItem'

function SeedsHeaderItem({seed, item, id, setSeeds, seeds, label}) {

    const [activeStyle, setActiveStyle] = useState('seed--clicked')

    function removeSeed(e) {
        const newSeeds = [...seeds]
        newSeeds.splice(seeds.indexOf(seed), 1)
        setSeeds(newSeeds)
    }

    function handleClick(e) {
        removeSeed(e)
    }

    useEffect(() => {

    }, [seeds])
        // <div className={` top-items__item top-items__item--header ${activeStyle} seed-view__topbar-seed`} onClick={(e) => handleClick(e)}>
    return(
        <div className={`seed-view__topbar-seed ${activeStyle}`} onClick={(e) => handleClick(e)}>
            <p>{item}</p>
        </div>
    )
}

export default SeedsHeaderItem

// I want to set it ACTIVE by default, but also factor in that alter the handleClick to "REMOVE" seed by default, as is it will re-add the seed because