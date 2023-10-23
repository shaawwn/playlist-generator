import {useState, useEffect} from 'react';
import TopItem from './TopItem'
import { v4 as uuidv4 } from 'uuid';

function TopItemsContainer({items, label, setSeeds, seeds}) {
    return(
        <div className='top-items__wrapper'>
            <h2>{label}</h2>
            <div className="top-items__container">
                {items.map((item) => {
                    return <TopItem 
                        item={item.name ? item.name : item}
                        id={item.id ? item.id: item}
                        setSeeds={setSeeds}
                        seeds={seeds}
                        label={label}
                        key={item.id ? item.id + 'top' : item + 'top' }
                    />
                })}
            </div>
        </div>

    )
}

export default TopItemsContainer