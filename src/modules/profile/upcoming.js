import React, {useState, useEffect} from "react";
import { View,Text,Image,FlatList,SafeAreaView,StyleSheet} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { vh } from "../../assets/dimension";
import { addUpcoming } from "../home/action";
import GenreItem from "../../components/GenreItem"

export default function upcoming(props){

    const dispatch = useDispatch();
    const user = useSelector(state=>state.movie);

    const add = (data) => {
        dispatch(addUpcoming(data));
    }

    const renderItem =({item,index}) => {


        return(
            <View style={styles.flatl}>
            <Image style={styles.img} source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}/>
            <View style={styles.textWrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.overview}</Text>
            <GenreItem
                genres={item.genre_ids}
            />
            </View>
            </View>
        )
    }

    useEffect(() => {
        return fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US")
.then(response => response.json()).then(responseJson => {
    responseJson.results.map((el)=>{
        el.my_list=false;
        el.rated=false;
        return el;
    })
   add(responseJson.results);
   
})
.catch(err => {
	console.error(err);
});
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topcon}>
            <Text style={styles.headertext}>Coming Soon</Text>
            </View>
            <FlatList
                data={user.upcoming}
                renderItem={renderItem}
                keyExtractor ={(item,index)=>index.toString()}
            />
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010"
    },
    topcon:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:10
    },
    flatl:{
        paddingHorizontal:7,
        marginTop:12
    },
    img:{
        height:vh(200),
        width:"100%"
    },
    headertext:{
        fontFamily:"Ubuntu-Bold",
        fontSize:20,
        color:"white"
    },
    textWrapper:{
        paddingHorizontal:10,
        paddingVertical:15
    },
    title:{
        fontFamily:"Ubuntu-Bold",
        fontSize:20,
        color:"white",
    },
    description:{
        fontFamily:"Ubuntu-Light",
        color:"rgb(150,150,150)",
        fontSize:15,
        marginTop:7
    },
})
