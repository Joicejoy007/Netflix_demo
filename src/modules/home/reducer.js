

const initialState = {
    idList:[],
    list:[],
    myList:[],
    upcoming:[],
    tvList:[],
    tvIdList:[]
}

export default function movieReducer(state=initialState,action){

    switch(action.type){

        case "ADD_MOVIES" :
            let flag=0;
            state.idList.map((el)=>{
                if(el==action.id){
                    flag=1;
                }
                return el;
            })
            return {...state,list:flag==0?state.list.concat([action.payload]):state.list,idList:flag==0?state.idList.concat(action.id):state.idList}

        case "ADD_TO_LIST" :
            let flag1=0;
            let arr=state.myList.filter((el)=>{
                if(el.id!=action.payload.id){
                    return el
                }
                else{
                    flag1=1;
                }
            })
            return {...state,myList:flag1==0?state.myList.concat([action.payload]):arr}

        case "ADD_UPCOMING" :
            return {...state,upcoming:action.payload}
        
        case "ADD_TV" :
            flag=0;
            state.tvIdList.map((el)=>{
                if(el==action.id){
                    flag=1;
                }
                return el;
            })
            return {...state,tvList:flag==0?state.tvList.concat([action.payload]):state.tvList,tvIdList:flag==0?state.tvIdList.concat(action.id):state.tvIdList}

        default:
            return state;
    }
}