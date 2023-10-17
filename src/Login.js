import React from 'react';



export default function Login({authUrl}) {

    return(
        <div className="view">
            <a href={authUrl}>
                <div className="btn login--btn">
                    <h1>Login with Spotify</h1>
                </div>
            </a>
        </div>

    )
}