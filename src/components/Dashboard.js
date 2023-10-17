import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'

function Dashboard({code}) {

    const accessToken = useAuth(code)
    return (
        <div className="dashboard">
            <h1>Hello dashboard!</h1>
        </div>
    )
}

export default Dashboard