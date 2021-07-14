import React, { useEffect, useState } from 'react';
import { SafeAreaView,View,Image,FlatList,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import { vh, vw } from '../../../assets/dimension';
import { addEachMovie } from '../../details/action';

export default function Search(props){

    const [keyword,setKeyword]=useState('');
    const [data,setData]=useState('');

    const dispatch =useDispatch();

    const add = (data) => {
        dispatch(addEachMovie(data));
        props.navigation.navigate('Detail');
    }


    useEffect(()=>{
        return fetch("https://api.themoviedb.org/3/search/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&query="+keyword)
.then(response => response.json()).then(responseJson => {
    if(responseJson.results!=undefined)
    responseJson.results.map((el)=>{
        el.my_list=false;
        el.rated=false;
        return el;
    })
   setData(responseJson.results);
   console.log(data);
})
.catch(err => {
	console.error(err);
});
    },[keyword])

    const renderItem = ({item,index}) => {

        return(
            <TouchableOpacity style={styles.flatl} onPress={()=>{
                add(item);
            }}>
            <View style={{flexDirection:'row',flex:0.8,alignItems:"center"}}> 
            <Image style={styles.movieimg} source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}/>
            <Text style={styles.title}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Video')}>
            <Image style={styles.img1} source={require('../../../assets/Images/play-button.png')}/>
            </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Image style={styles.img} source={require('../../../assets/Images/arrow-2.png')}/>
        </TouchableOpacity>
        <TextInput
            style={styles.searchbar}
            onChangeText={(text)=>setKeyword(text)}
            placeholder="Search"
        />
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index)=>item.id.toString()}
        />
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010",
    },
    img:{
        height:vw(18),
        width:vw(18),
        marginLeft:15,
        marginTop:10
    },
    img1:{
        height:vw(25),
        width:vw(25),
        marginLeft:15
    },
    searchbar:{
        height:vh(40),
        width:"95%",
        marginHorizontal:15,
        backgroundColor:"white",
        marginTop:15,
        borderRadius:5,
        paddingHorizontal:15
    },
    flatl:{
        paddingHorizontal:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:10
    },
    movieimg:{
        height:vh(70),
        width:vw(130),
        borderRadius:10
    },
    title:{
        fontSize:16,
        color:"white",
        fontFamily:"Ubuntu-Medium",
        marginLeft:7,
        flex:1
    }
})