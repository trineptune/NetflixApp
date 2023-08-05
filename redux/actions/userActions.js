export const GET_USER = "GET_USER"
export const CREATE_USER = "CREATE_USER"
export const LOGIN = "LOGIN"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const EXTEND_USER = "EXTEND_USER"
export const getDetails = (user) => {
    return {
        type: GET_USER,
        payload: user

    }
}

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const logIn = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}
export const logInFail = () => {
    return{
        type: LOGIN_FAIL,
        payload:'error'
    }
}

export const extendTimeUser = (status) =>{
    return {
        type:EXTEND_USER,
        payload:status
    }
}
export const getUserByID = (id) => {
    return(dispatch) => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5555/api/user/${id}`)
                const user = await respone.json()
                await dispatch(getDetails(user));
            }
            catch(error){
                console.log(error)
            }
        }
        getData()
    }
}
const ip = 'http://10.104.23.96:5555'
export const registerUser = (user)  => {
    return (dispatch) => {
        const postData = async() => {
            try{
                await fetch(`${ip}/api/user`,{
                    method:"POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body:JSON.stringify(user)
                });
                await dispatch(createUser(user))
            }catch(err){
                console.log(err)
            }
        }
        postData()
        

    }
}

export const logInUser = (user) => {
    return (dispatch) => {
        const postData = async() => {
            try{
                //10.104.20.1
                await fetch(`${ip}/api/user/login`,{
                    method:"POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body:JSON.stringify(user)
                }).then(async(respone) => {
                    // console.log('status respone',respone.status)
                    if (respone.status == 201)
                    {
                        const user2 = await respone.json()
                        dispatch(logIn(user2))
                    }
                    else{
                        dispatch(logInFail())
                    }
                })
                
            }catch(err){
                console.log(err)
            }
        }
        postData()
}
}

export const extendUser = (id) => {
    return (dispatch) => {
        const putData = async() =>{
            try{
                await fetch(`${ip}/api/user/${id}`,{
                    method:'PUT',
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    }
                })
                    dispatch(extendTimeUser('success'))
                }
                catch(error){
                    console.log(error)
                }
            }
            putData()
        }    
    }
