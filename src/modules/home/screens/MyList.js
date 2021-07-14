import React ,{useState} from "react";
import { View, Text , TouchableOpacity ,Image ,FlatList,StyleSheet,SafeAreaView} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { vh, vw } from "../../../assets/dimension";
import ListItem from "../../../components/ListItem";
import { addEachMovie } from "../../details/action";

export default function MyList(props){

    const user=useSelector(state=>state.movie);
    const dispatch = useDispatch();

    const addEach = (data) => {
        dispatch(addEachMovie(data));
    }

    const renderItem = ({item,index}) => {

        return(
            <ListItem source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}} onPress={()=>{
                addEach(item)
                if(item.media_type=="movie")
                props.navigation.navigate('Detail')
                else
                props.navigation.navigate('TvDetail');
            }}/>
            );
    }


    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcon}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Image style={styles.img} source={require("../../../assets/Images/arrow-2.png")}/>
        </TouchableOpacity>
        <Text style={styles.headertext}>My List</Text>
        </View>
        <FlatList
            data={user.myList}
            numColumns={3}
            style={{marginLeft:10}}
            renderItem={renderItem}
        />
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010",
    },
    topcon:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:10
    },
    img:{
        height:vw(20),
        width:vw(20),
        marginRight:30,
        marginLeft:10
    },
    headertext:{
        fontFamily:"Ubuntu-Bold",
        fontSize:20,
        color:"white"
    }
})