//

function getTopArtistGenres(topItems) {
    // an array of users top items where each itesm in the array is an an artist object with 'genres' attribute
    let genreListTotal = []

    topItems.forEach((item) => {
        // console.log(item)
        item.genres.forEach((genre) => {
            genreListTotal.push(genre)
        })
    })

    let genreSet = new Set(genreListTotal)

    return [genreListTotal, genreSet]
}

function getTopArtists(topItems) {
    // return a list of the top artists fro a user
    // need to get artist IDs too I think
    let topArtists = []

    topItems.forEach((item) => {
        let artist = {
            name: item.name,
            id: item.id
        }
        topArtists.push(artist)
    })

    return topArtists
}

function getTopTracks(topItems) {
    // return the top tracks with name, artist, uri/ids
    let topTracks = []

    topItems.forEach((item) => {
        let track = {
            name: item.name,
            artist: item.artists[0].name,
            id: item.id
        }
        topTracks.push(track)
    })

    return topTracks
}
/**
 * 
 */
module.exports = {
    getTopArtistGenres,
    getTopArtists,
    getTopTracks
}