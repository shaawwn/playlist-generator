import {useState, useEffect} from 'react';
import TopItem from './TopItem'


function TopItemsContainer({items, label}) {

  

    return(
        <div className='top-items__wrapper'>
            <h2>{label}</h2>
            <div className="top-items__container">
                {items.map((item) => {
                    return <TopItem 
                        item={item.name ? item.name : item}
                        id={item.id ? item.id: ''}
                    />
                })}
            </div>
        </div>

    )
}

export default TopItemsContainer