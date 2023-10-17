const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
console.log("ENV", process.env)
const app = express()
// app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.post('/login', function(req, res) {

    const code = req.body.code;
    // console.log(code)
    // console.log("CODE IN BODY", code, req.body, req.method)
    console.log("CLIENT ID", process.env.CLIENT_ID)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/refresh', function(req, res) {
    const refreshToken = req.body.refreshToken
    console.log("REFRESH", refreshToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3001',
        clientId: '02fc8d8e87dc40a89395a26008c487ac',
        clientSecret: '0762c9ae26ea49ff93fcdf50091c6a9b',
        refreshToken
    })  

    spotifyApi.refreshAccessToken()
    .then(data => {
        console.log("Access token has been refreshed", data.body)
        // spotifyApi.setAccessToken(data.body['access_token'])
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log('error', err)
        res.sendStatus(400)
    })
})

var port = process.env.PORT || 3000;
app.listen(3000, function() {
    console.log("Listening on: ", port)
})
