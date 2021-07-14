const addEachMovie = (data) => {
    return{
        type:"ADD_MOVIE_DATA",
        payload:data
    }
}
const setToList = () => {
    return {
        type:"SET_TO_LIST",
    }
}
const rateMovie = () => {
    return {
        type:"RATE_MOVIE"
    }
}
const setSimilar = (data)  => {
    return {
        type:"ADD_SIMILAR",
        payload:data
    }
}
const setVisible = () => {
    return {
        type:"SET_VISIBLE",
    }
}

export {addEachMovie,setToList,rateMovie,setSimilar,setVisible}