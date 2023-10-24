import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faHandPointer, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'


export default function Login({authUrl}) {

    return(
        <div className="view view__login">
            <div className="login__banner">
                <p className="login__banner__title">Playlist Generator</p>
                <div className="music">
                    <FontAwesomeIcon icon={faMusic} size="4x" />
                    <FontAwesomeIcon icon={faMusic} size="4x" />
                </div>
            </div>

            <div className="login__intro">
                <div className="login__intro__flowchart">
                    <div className="login__intro__flowchart__item">
                        <p>Choose Tracks and Artists</p>
                        <div className="login__intro__item__wrapper">
                            <FontAwesomeIcon icon={faHandPointer} size="2x" className="login__hand" />
                            <div className="top-items__item animation__piece">
                                <p>Freebird</p>
                            </div>
                        </div>

                    </div>

                    <div className="login__intro__flowchart__item">
                        <p>Generate a playlist</p>
                        <FontAwesomeIcon icon={faSpinner} size="2x" className="login__spinner"/>
                    </div>

                    <div className="login__intro__flowchart__item">
                        <p>Play in browser or save playlist to Spotify!</p>
                        <FontAwesomeIcon icon={faCheck} size="2x" className="login__check"/>
                    </div>
                </div>
                <a href={authUrl}>
                    <div className="btn login__btn">
                        <h1>Get Started</h1>
                    </div>
                </a>  
            </div>
        </div>

    )
}