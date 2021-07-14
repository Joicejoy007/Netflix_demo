const initialState={
    data:[],
    isLoggedIn:false,
    currentUser:{}
}

export default function authReducer(state=initialState,action){

    switch(action.type){

        case "ADD_USER":
            return {...state,data:state.data.concat([action.payload])}

        case "SIGN_IN":
            return {...state,isLoggedIn:!state.isLoggedIn};
        
        case "ADD_CURRENT_USER":
            return {...state,currentUser:action.payload};

        default:
            return state;
    }
}