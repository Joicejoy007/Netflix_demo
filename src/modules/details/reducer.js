const initialState={
    data:{"adult": false, "backdrop_path": "/620hnMVLu6RSZW6a5rwO8gqpt0t.jpg", "genre_ids": [Array], "id": 508943, "media_type": "movie", "my_list": false, "original_language": "en", "original_title": "Luca", "overview": "Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.", "popularity": 4393.272, "poster_path": "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg", "rated": false, "release_date": "2021-06-17", "title": "Luca", "video": false, "vote_average": 8.1, "vote_count": 2448},
    similar:[],
    isVisible:true
}

export default function detailReducer(state=initialState,action){
    switch(action.type){
        case "ADD_MOVIE_DATA":
            return {...state,data:action.payload}
        case "SET_TO_LIST" :
            state.data.my_list=!state.data.my_list;
            return {...state,data:state.data}
        case "RATE_MOVIE" :
            state.data.rate=!state.data.rate;
            return {...state};
        case "ADD_SIMILAR" :
            return {...state,similar:action.payload};

        case "SET_VISIBLE":
            return {...state,isVisible:!state.isVisible};

        default:
            return state;
    }

}