export const GETALL_MYLIST = 'GETALL_MYLIST'

export const getAllMyList = (movies) => 
{
    return{
        type: GETALL_MYLIST,
        payload: movies
    }
}

export const fetchAllMyList = (id) => {
    return(dispatch) => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5555/api/user/mylist/${id}`)
                const movies = await respone.json()
                await dispatch(getAllMyList(movies));
            }
            catch(error){
                console.log(error)
            }
        }
        getData()
    }
}