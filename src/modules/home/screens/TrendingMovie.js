import React,{ useState, useEffect,useRef } from "react";
import { Image,Text,Animated,TouchableOpacity, View ,FlatList,SafeAreaView, StyleSheet, Dimensions} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { vw ,vh} from "../../../assets/dimension";
import Genres from './Genres';
import GenreItem from "../../../components/GenreItem";
import { addEachMovie } from "../../details/action";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TrendingMovie(props){

    const offset = useRef(new Animated.Value(0)).current
    const anim = useRef(new Animated.Value(0)).current
    const insets=useSafeAreaInsets();
    const [startpos,setStartpos]=useState(0);
    const [currIndex,setCurrIndex]=useState(0);
    const dispatch = useDispatch();

    const width=Dimensions.get('window').width;

    const addEach=(data)=>{
        dispatch(addEachMovie(data));
        props.navigation.navigate("Detail");
    }

    const playVideo =() => {
        props.navigation.navigate('Video')
    }

    const sectiondata=["Tv","Movies","My List"];

    const translateAnimation = offset.interpolate({
        inputRange:[0,500],
        outputRange:[vh(36),0],
        extrapolate:"clamp"
    })

    const backgroundAnimation = offset.interpolate({
        inputRange:[0,500],
        outputRange:["rgba(0,0,0,0.25)","rgba(0,0,0,0.7)"],
        extrapolate:"clamp"
    })

    const renderHeader = () => {
        return(
            <TouchableOpacity onPress={()=>addEach(head)}>
            <Image style={styles.img} source={{uri:`https://image.tmdb.org/t/p/original${head.backdrop_path}`}}/>
            <View style={styles.playview}>
            <GenreItem
                genres={head.genre_ids}
            />
            <TouchableOpacity style={styles.playbtn} onPress={playVideo}>
        <Image style={styles.icon} source={require('../../../assets/Images/play-button-arrowhead.png')}/>
        <Text style={styles.playtext}>Play</Text>
        </TouchableOpacity>
            </View>
            </TouchableOpacity>
        )
    }



    const renderItem = ({item,index}) => {
        return(
        <Genres title={item.genre} link={item.link} index={index} navigation={props.navigation}/>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
        <FlatList
            data={GenreList}
            keyExtractor={(item)=>item.id.toString()}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            {useNativeDriver:false}
          )}
          scrollEventThrottle={16}
        />
         <Animated.View style={[styles.topcon,{backgroundColor:backgroundAnimation,top:insets.top}]}>
         <Animated.View style={[styles.animcon,{height:translateAnimation}]}>
        <Image style={styles.appIcon} source={require("../../../assets/Images/n.png")}/>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Search')}>
        <Image style={styles.icon1} source={require("../../../assets/Images/loupe.png")}/>
        </TouchableOpacity>
        </Animated.View>
        <View style={styles.section}>
        {
            sectiondata.map((el,index)=>{

                const onPress = (data) => {
                    setCurrIndex(index);
                    if(index!=currIndex){
                        opacityAnimation=anim.interpolate({
                            inputRange:[0,1],
                            outputRange:[1,0]
                        })
                    }
                    Animated.timing(anim,{
                            toValue:1,
                            duration:300,
                            useNativeDriver:true}).start(()=>
                            Animated.timing(anim,{
                                        toValue:0,
                                    duration:0,
                                    useNativeDriver:true
                                    }).start(()=>
                                props.navigation.navigate(data)));
                }
                var heightAnimation=0;
                var opacityAnimation=1;
                if(currIndex==index){
                    heightAnimation = anim.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,-((width/3)*index+startpos)],
                        })
                        
                }
                else {
                    heightAnimation=0;
                    opacityAnimation=anim.interpolate({
                            inputRange:[0,0.1],
                            outputRange:[1,0]
                        })
                }
                const onLayout = (e) => {
                        const {x}=e.nativeEvent.layout;
                        setStartpos(x);
                        }
                return(
                    <View style={{flex:0.33,alignItems:"center"}}>
                    <Animated.Text onLayout={onLayout} style={[styles.sectiontext,{transform:[{translateX:heightAnimation}],opacity:opacityAnimation}]} onPress={onPress.bind(this,el)}>{el}</Animated.Text>
                    </View>
                )
            })
        }
        </View>
        </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010",
    },
    img:{
        height:vh(400),
        width:vw(400),
        marginBottom:10,
    },
    topcon:{
        paddingHorizontal:10,
        paddingTop:5,
        backgroundColor:"rgba(52,52,52,0.6)",
        right:0,
        left:0,
        position:"absolute",
        flex:0.1
    },
    appIcon:{
        height:"100%",
        width:vw(40),
    },
    section:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:0.5,
        paddingVertical:10
    },
    sectiontext:{
        fontFamily:"Ubuntu-Light",
        fontSize:20,
        fontWeight:"500",
        color:"white",
    },
    playview:{
        paddingHorizontal:10,
        bottom:0,
        backgroundColor:"rgba(0,0,0,0.7)",
        height:"23%",
        width:"100%",
        position:"absolute",
        alignItems:"center",
        paddingBottom:10
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
    playbtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"50%",
        paddingVertical:10,
        borderRadius:4,
        backgroundColor:"white",
        marginBottom:10,
    },
    animcon:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    playtext:{
        fontSize:18,
        fontFamily:"Ubuntu-Bold",
    },
    icon:{
        height:vw(18),
        width:vw(18),
        marginRight:10
    },
    icon1:{
        height:"50%",
        width:vw(23),
        marginRight:10
    },
})

const head = {"adult": false, "backdrop_path": "/yizL4cEKsVvl17Wc1mGEIrQtM2F.jpg", "genre_ids": [28,878], "id": 588228, "media_type": "movie", "my_list": false, "original_language": "en", "original_title": "The Tomorrow War", "overview": "The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.", "popularity": 6694.868, "poster_path": "/xipF6XqfSYV8DxLqfLN6aWlwuRp.jpg", "rated": false, "release_date": "2021-07-02", "title": "The Tomorrow War", "video": false, "vote_average": 8.4, "vote_count": 1925}

const GenreList = [
    {
        genre:"Trending",
        id:1,
        link:"trending/movie/week?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&page=1"
    },
    {
        genre:"Action",
        id:28,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=28"
    },
    {
        genre:"Adventure",
        id:12,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=12"
    },
    {
        genre:"Animation",
        id:16,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=16"
    },
    {
        genre:"Comedy",
        id:35,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=35"
    },
    {
        genre:"Crime",
        id:80,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=80"
    },
    {
        genre:"Documentry",
        id:99,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=99"
    },
    {
        genre:"Drama",
        id:18,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=18"
    },
    {
        genre:"Family",
        id:10751,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10751"
    },
    {
        genre:"Fantasy",
        id:14,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=14"
    },
    {
        genre:"History",
        id:36,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=36"
    },
    {
        genre:"Horror",
        id:27,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=27"
    },
    {
        genre:"Music",
        id:10402,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10402"
    },
    {
        genre:"Mystery",
        id:9648,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=9648"
    },
    {
        genre:"Romance",
        id:10749,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10749"
    },
    {
        genre:"Science Fiction",
        id:878,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=878"
    },
    {
        genre:"TV Movie",
        id:10770,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10770"
    },
    {
        genre:"Thriller",
        id:53,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=53"
    },
    {
        genre:"War",
        id:10752,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10752"
    },
    {
        genre:"Western",
        id:37,
        link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=37"
    },
]