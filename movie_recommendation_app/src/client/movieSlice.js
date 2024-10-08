const api_key = '83d45f5930a858b110ea81262e1bf8de'

const fetch = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4M2Q0NWY1OTMwYTg1OGIxMTBlYTgxMjYyZTFiZjhkZSIsInN1YiI6IjY1OGJlNDQ4YjMzOTAzMjFjOGU4NDE5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HQKyTRE_JhmgQfFgf0HyN_8E061CE9PLixwFVsN7Gzk' 
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated', options);
    }
}