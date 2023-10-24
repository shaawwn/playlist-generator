import React from 'react';



export default function Login({authUrl}) {

    return(
        <div className="view view__login">
            <div className="login__banner">
                <p>Playlist Generator</p>
            </div>
            <div className="login__intro">
                <p>Generate playlists by choosing tracks or artists. You can choose from your top items, or you acn search for new ones.</p>
                <a href={authUrl}>
                    <div className="btn login--btn">
                        <h1>Login with Spotify</h1>
                    </div>
                </a>  
            </div>
        </div>

    )
}