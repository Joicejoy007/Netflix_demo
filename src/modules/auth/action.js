const addUser = (data) => {
    return {
        type:"ADD_USER",
        payload:data
    }
}

const signInAction = () => {
    return {
        type:"SIGN_IN"
    }
}

const addCurrentUser = (data) => {
    return {
        type:"ADD_CURRENT_USER",
        payload:data
    }
}

export {signInAction,addUser,addCurrentUser};