import {useState, useEffect} from 'react'

import TopItem from './TopItem'

function SeedsHeaderItem({seed, item, id, setSeeds, seeds, label}) {

    const [activeStyle, setActiveStyle] = useState('top-items__item--clicked')
    // const [seed, setSeed] = useState([label, id, item])


    function removeSeed(e) {
        const newSeeds = [...seeds]
        newSeeds.splice(seeds.indexOf(seed), 1)
        setSeeds(newSeeds)
        // const arrayToSearch = newSeeds;
        // const arrayToFind = seed;
        
        // const index = arrayToSearch.findIndex(item => JSON.stringify(item) === JSON.stringify(arrayToFind));
        
        // if (index !== -1) {
        //     newSeeds.splice(seed[index], 1)
        //     setSeeds(newSeeds)
        // } else {
        //     console.log("Not in array", index, seed, newSeeds)
        // }
    }

    function handleClick(e) {
        removeSeed(e)
    }

    useEffect(() => {

    }, [seeds])

    return(
        <div className={`top-items__item top-items__item--header ${activeStyle}`} onClick={(e) => handleClick(e)}>
            <p>{item}</p>
        </div>
    )
}

export default SeedsHeaderItem

// I want to set it ACTIVE by default, but also factor in that alter the handleClick to "REMOVE" seed by default, as is it will re-add the seed because