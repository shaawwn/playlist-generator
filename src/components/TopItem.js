import {useState, useEffect} from 'react';

function TopItem({item, id, setSeeds, seeds, label}) {
    const [seed, setSeed] = useState([label, id, item])
    const [active, setActive] = useState(false) // use this state to determine if an item is clicked
    const [activeStyle, setActiveStyle] = useState('')

    function handleSetSeeds() {
        // check that seeds  not greater than 5 and then append to seeds
        // append the type and ID, for example seed.append({'genre': 'rock'}) or {'track': '12312jnk12}
        // that way its easier to keep track of the number of seeds
    }

    function handleClick(e) {
        e.stopPropagation()
        _clickDiv(e) === true ? _checkSelected(e.target) : _checkSelected(e.target.parentNode)
    }

    function addSeed(e) {
        console.log("Adding seed", seed)
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

    function _checkSelected(e) {
        // assuming e is a div, check if it already selected, if not, select, if it is, deselect
        e.classList.contains('top-items__item--clicked') ? removeSeed(e) : addSeed(e)
    }

    function _clickDiv(e) {
        if(e.target.childElementCount === 0) {
            return false
        }
        return true
    }

    useEffect(() => {
        if(active === true) {
            // console.log("Setting active")
            setActiveStyle('top-items__item--clicked')
        } else {
            // console.log("Removing active")
            setActiveStyle('')
        }
    }, [active])


    useEffect(() => {

        if(seeds.length === 0 && active === true) {
            setActive(false)
        }

        // check if the current seed is within seeds
        if(!seeds.includes(seed)) {
            setActive(false)
        }
    }, [seeds])

    return(
        <div className={`top-items__item ${activeStyle}`} onClick={(e) => handleClick(e)}>
            <p>{item}</p>
        </div>
    )
}

export default TopItem