import {useState, useEffect, useRef} from 'react';

function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // const serverURL = 'https://wispy-bird-2586.fly.dev'
    // http://localhost:3000/login
    useEffect(() => {

        fetch('https://wispy-bird-2586.fly.dev/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code:code
            })
        }).then((response) => response.json())
        .then((data) => {
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            setExpiresIn(data.expiresIn)
            window.history.pushState({}, null, '/playlist-generator/')

        })
        .catch((err) => {
            window.location = '/playlist-generator/'
        })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            fetch('https://wispy-bird-2586.fly.dev/refresh', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            }).then((response) => response.json())
            .then((data) => {
                setAccessToken(data.accessToken)
                setExpiresIn(data.expiresIn)
                window.history.pushState({}, null, '/playlist-generator')
                //
            })
            .catch((err) => {
                window.location = '/playlist-generator'
            })
        }, (expiresIn - 60) * 1000)
        if(!refreshToken || !expiresIn) return

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth;
