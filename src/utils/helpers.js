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

function countGenres(genreList, genreSet) {
    // return an object with genre list count eg {classic rock: 5, blues: 3, classical: 1}
    let genreCount = {}
    genreSet.forEach((genre) => {
        // item will be the toSearch string
        genreCount[genre] = genreList.filter(item => item === genre).length
    })

    return genreCount
}

function sortTopGenres(genreCount) {
    const sortedObjDescending = Object.fromEntries(
        Object.entries(genreCount).sort(([, a], [, b]) => b - a)
      );
      let toShowGenre = (Object.keys(sortedObjDescending).length -1) < 20 ? Object.keys(sortedObjDescending).length - 1 : 20
    return Object.keys(sortedObjDescending).slice(0, toShowGenre)
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
    getTopTracks,
    countGenres,
    sortTopGenres
}