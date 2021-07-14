const initialState = {
    data:{}
}

export default function profileReducer(state=initialState,action){

    switch(action.type){

        case "ADD_DATA":
            return {...state,...action.payload}
        
        default:
            return state;
    }
}