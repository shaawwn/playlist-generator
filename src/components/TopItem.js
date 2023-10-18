import {useState, useEffect} from 'react';

function TopItem({item, id, setSeeds, seeds, label}) {
    const [seed, setSeed] = useState([label, id])
    function handleSetSeeds() {
        // check that seeds  not greater than 5 and then append to seeds
        // append the type and ID, for example seed.append({'genre': 'rock'}) or {'track': '12312jnk12}
        // that way its easier to keep track of the number of seeds
    }

    function handleClick(e) {
        _clickDiv(e) === true ? _checkSelected(e.target) : _checkSelected(e.target.parentNode)
    }

    function addSeed(e) {
        if(seeds.length < 5) {

            setSeeds([...seeds, seed])
            e.classList.add('top-items__item--clicked')
        } else {
            console.log(seeds.length, seeds)
            alert("Cannot add anymore seeds", seeds)
        }
    }

    function removeSeed(e) {
        e.classList.remove('top-items__item--clicked')
        const newSeeds = [...seeds]
        newSeeds.splice(seeds.indexOf(seed), 1)
        setSeeds(newSeeds)
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
    return(
        <div className="top-items__item" onClick={(e) => handleClick(e)}>
            <p>{item}</p>
        </div>
    )
}

export default TopItem