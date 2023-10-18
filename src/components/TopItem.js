import {useState, useEffect} from 'react';

function TopItem({item, id}) {

    function handleClick(e) {
        e.stopPropagation()
        
        if(e.target.childElementCount === 0) {
            console.log(e.target.parentNode)
            e.target.parentNode.classList.add('top-items__item--clicked')
        } else {
            e.target.classList.add('top-items__item--clicked')
        }       
    }

    return(
        <div className="top-items__item" onClick={(e) => handleClick(e)}>
            <p>{item}</p>
        </div>
    )
}

export default TopItem