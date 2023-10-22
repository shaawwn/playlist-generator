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

function generatePlaylist(genres, artists, tracks, accessToken, setRecommendations) {
    // return a recommended playlist using genre/artist/track seeds
    // can use a total of FIVE genre/artist/tracks, anything extra willr eturn an an error, also not all genres are used in the genre_seed
    
    // genres are string names for the genre (eg 'classical', 'hard-rock') where hyphens are used for spaces
    // artist/tracks are the IDs of artist/tracks
    // everything is comma seperated

    fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${genres}&seed_artists=${artists}&seed_tracks=${tracks}
    `, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then((response) => response.json())
    .then((data) => {
        setRecommendations(data.tracks)
    })
    .catch((err) => {
        console.log("There was an error", err)
    })    
}

function getTrackUris(tracks) {
    // tracks is an array of objects, the uri is track.uri

    let uris = []

    tracks.forEach((track) => {
        uris.push(track['uri'])
    })



    return uris
}

function shufflePlaylist(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
  }

  function msToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    return (
        seconds == 60 ?
        (minutes+1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      );
  }
/**
 * 
 */
module.exports = {
    getTopArtistGenres,
    getTopArtists,
    getTopTracks,
    countGenres,
    sortTopGenres,
    generatePlaylist,
    getTrackUris,
    shufflePlaylist,
    msToMinutesAndSeconds
}