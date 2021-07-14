import React,{useState ,useEffect} from 'react';
import { View ,SafeAreaView, Text , Image ,ScrollView, TouchableOpacity ,StyleSheet, FlatList} from 'react-native';
import { normalize, vh, vw } from '../../assets/dimension';
import { useSelector ,useDispatch} from 'react-redux';
import { rateMovie,addEachMovie, setSimilar, setToList } from './action';
import { addToList } from '../home/action';
import ListItem from '../../components/ListItem';

export default function TvDetail({props,navigation,route}){

    const [data,setData]=useState(false);

    const dispatch = useDispatch();
    const addMyList= () =>{
        dispatch(setToList());
        dispatch(addToList(eachMovie.data));
    }
    const rate = () => {
        dispatch(rateMovie())
    }
    const addEach=(data)=>{
        dispatch(addEachMovie(data));
    }


    const eachMovie = useSelector(state=>state.detail)
    const listImage = eachMovie.data.my_list?require('../../assets/Images/check-2.png'):require('../../assets/Images/plus.png');
    const rateImage = eachMovie.data.rate?require('../../assets/Images/like.png'):require('../../assets/Images/like-2.png');
    const shareImage = require('../../assets/Images/share.png');

    useEffect(() => {
        eachMovie.data.genre_ids.map((el)=>{
            if(el===16){
                setData(true);
            }
        })
        return fetch(`https://api.themoviedb.org/3/tv/${eachMovie.data.id}/similar?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US`)
.then(response => response.json()).then(responseJson => {
   dispatch(setSimilar(responseJson.results));
   
})
.catch(err => {
	console.error(err);
});
    }, [])

    const renderSimilar=({item,index}) => {
        return(
            <ListItem source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}} onPress={()=>{
                addEach(item)
                navigation.goBack()
                navigation.navigate('TvDetail')
            }}/>
            );
    }
    const renderHeader = () => {
        return(
            <View style={styles.desccontainer}>
            <Text style={styles.title}>{eachMovie.data.name}</Text>
        <View style={styles.datecontainer}>
        <Text style={styles.releasedate}>{eachMovie.data.first_air_date==undefined?" ":eachMovie.data.first_air_date.slice(0,4)}</Text>
        <View style={styles.agelimitcon}>
        <Text style={styles.agetext}>{data?"3+":"18+"}</Text>
        </View>
        <Text style={styles.releasedate}>{eachMovie.data.vote_average}</Text>
        </View>
        <TouchableOpacity style={styles.playbtn} onPress={()=>navigation.navigate("Video")}>
        <Image style={styles.icon} source={require('../../assets/Images/play-button-arrowhead.png')}/>
        <Text style={styles.playtext}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.playbtn,{backgroundColor:"#212121"}]}>
        <Image style={styles.icon} source={require('../../assets/Images/download-2.png')}/>
        <Text style={[styles.playtext,{color:"white"}]}>Download</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{eachMovie.data.overview}</Text>
        <View style={styles.featurecon}>
        <TouchableOpacity style={styles.btn} onPress={addMyList}>
        <Image style={styles.rateicon}  source={listImage}/>
        <Text style={styles.ratetext}>My List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={rate}>
        <Image style={styles.rateicon}  source={rateImage}/>
        <Text style={styles.ratetext}>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
        <Image style={styles.rateicon}  source={shareImage}/>
        <Text style={styles.ratetext}>Share</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.footercon}/>
        <View style={styles.footbar}/>
        <Text style={[styles.title,{fontSize:15}]}>MORE LIKE THIS</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
        <Image style={styles.video} source={{uri:`https://image.tmdb.org/t/p/original${eachMovie.data.poster_path}`}}/>
        <View style={styles.searchcon}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image style={styles.backbtn} source={require('../../assets/Images/arrow-3.png')}/>
        </TouchableOpacity>
        </View>
        <FlatList
            numColumns={3}
            data={eachMovie.similar}
            style={{marginHorizontal:12}}
            keyExtractor={(item,index)=>item.id.toString()}
            renderItem={renderSimilar}
            ListHeaderComponent={renderHeader}
        />
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010",
    },
    video:{
        height:vh(200),
        width:"100%",
    },
    title:{
        fontFamily:"Ubuntu-Bold",
        fontSize:normalize(30),
        color:"white"
    },
    desccontainer:{
        paddingHorizontal:0,
        paddingVertical:10
    },
    releasedate:{
        color:"rgb(120,120,120)",
        fontFamily:"Ubuntu-Light",
        fontSize:14,
        fontWeight:"500"
    },
    datecontainer:{
        paddingVertical:10,
        flexDirection:"row",
        alignItems:"center",
    },
    agelimitcon:{
        paddingVertical:1,
        paddingHorizontal:5,
        backgroundColor:"#313131",
        marginHorizontal:10,
        borderRadius:5
    },
    agetext:{
        fontFamily:"Ubuntu-Light",
        fontWeight:"600",
        fontSize:15,
        color:"rgb(150,150,150)"
    },
    playbtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"white",
        marginBottom:10
    },
    playtext:{
        fontSize:18,
        fontFamily:"Ubuntu-Bold",
    },
    description:{
        color:"white",
        fontFamily:"Ubuntu-Medium",
        fontSize:15
    },
    icon:{
        height:vh(18),
        width:vw(18),
        marginRight:10
    },
    featurecon:{
        flexDirection:"row",
        paddingVertical:20
    },
    rateicon:{
        height:vw(25),
        width:vw(25)
    },
    btn:{
        flex:0.25,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10
    },
    ratetext:{
        fontFamily:"Ubuntu-Light",
        fontSize:14,
        color:"rgb(200,200,200)",
        marginTop:10
    },
    footercon:{
        height:vh(2),
        width:"100%",
        backgroundColor:"rgb(42,42,42)"
    },
    footbar:{
        height:vh(5),
        width:"30%",
        backgroundColor:"#E53935",
        marginBottom:10
    },
    searchcon:{
        flexDirection:"row",
        paddingHorizontal:20,
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"rgba(0,0,0,0)",
        position:"absolute",
        top:60
    },
    backbtn:{
        height:vw(30),
        width:vw(30),
    }
})