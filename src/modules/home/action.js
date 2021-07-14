const addMovies = (data,id) => {
    return {
        type:"ADD_MOVIES",
        payload:data,
        id:id
    }
}

const addTv = (data,id) => {
    return {
        type:"ADD_TV",
        payload:data,
        id:id
    }
}

const addToList = (data) => {
    return {
        type:"ADD_TO_LIST",
        payload:data
    }
}

const addUpcoming = (data) => {
    return {
        type:"ADD_UPCOMING",
        payload:data
    }
}

export {addMovies, addToList,addUpcoming,addTv};