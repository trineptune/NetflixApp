export const GETALL_MOVIES = 'GETALL_MOVIES'
export const GET_MOVIE = 'GET_MOVIE'
export const getAllMovies = (movies) => 
{
    return{
        type: GETALL_MOVIES,
        payload: movies
    }
}

export const getDetails = (movie) => {
    return {
        type: GET_MOVIE,
        payload: movie
    }
}
const ip = 'http://10.104.23.96:5555'
export const fetchAllMovies = () => {
    return(dispatch) => {
        const getData = async () => {
            try{
                const respone = await fetch(`${ip}/api/movies`)
                const movies = await respone.json()
                await dispatch(getAllMovies(movies));
            }
            catch(error){
                console.log(error)
            }
        }
        getData()
    }
}

export const getMovieById = (id) => {
    return (dispatch) => {
        const getData = async() => {
            try{
                const respone = await fetch(`${ip}/api/movies/${id}`)
                const movie = await respone.json()
                dispatch(getDetails(movie))
                console.log('here is movie action',movie)
            }
            catch(error){
                console.log(error)
            }
        }
        getData()
    }
}