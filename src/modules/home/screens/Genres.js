import React,{ useState, useEffect } from "react";
import { Image,Text, View ,FlatList, TouchableOpacity , StyleSheet} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import CustomModal from "../../../components/CustomModal";
import ListItem from "../../../components/ListItem";
import { addEachMovie } from "../../details/action";
import { addMovies } from "../action";


export default function Genres(props){

    const [visible,setVisible] = useState(false);

    const dispatch = useDispatch()
    const movieData = useSelector(state => state.movie);

    const add = (data,id) => {
        dispatch(addMovies(data,id));
    }

    const addEach=(data)=>{
        dispatch(addEachMovie(data));
    }

    const toggleVisibility = () => {
        setVisible(false);
    }

    const navigateDetail = () => {
        setVisible(false);
        props.navigation.navigate("Detail");
    }

    const playVideo =() => {
        setVisible(false);
        props.navigation.navigate('Video')
    }

    useEffect(() => {
        return fetch("https://api.themoviedb.org/3/"+props.link)
.then(response => response.json()).then(responseJson => {
    responseJson.results.map((el)=>{
        el.my_list=false;
        el.rated=false;
        return el;
    })
   add(responseJson.results,props.title);
   
})
.catch(err => {
	console.error(err);
});
    },[])

    const renderItem = ({item,index}) => {
        return(
        <ListItem source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}} onPress={()=>{
            addEach(item)
            setVisible(true);
        }}/>
        );
    }

    return(
        <View style={styles.container}>
        <Text style={styles.topcon}>{props.title}</Text>
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginBottom:10,flex:0.3}}
            keyExtractor={(item,index)=>item.id.toString()}
            data={movieData.list[props.index]}
            renderItem={renderItem}
        />
        <CustomModal visibility={visible} playpress={playVideo} toggle={toggleVisibility} navigate={navigateDetail}/>
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        padding:10
    },
    topcon:{
        color:"white",
        fontFamily:"Ubuntu-Bold",
        fontSize:25,
        marginBottom:15
    }
})