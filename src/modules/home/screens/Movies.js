import React ,{useState} from "react";
import { View, Text , TouchableOpacity ,Modal,Image ,FlatList,StyleSheet,SafeAreaView} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { vh, vw } from "../../../assets/dimension";
import ListItem from "../../../components/ListItem";
import { addEachMovie } from "../../details/action";

export default function Movies(props){

    const [curr,setCurr]=useState(0);

    const [visible,setVisible] = useState(false);

    const user=useSelector(state=>state.movie);
    const dispatch = useDispatch();

    const addEach = (data) => {
        dispatch(addEachMovie(data));
    }

    const selectGenre = (index) => {
        setCurr(index);
        setVisible(false);
    }

    const toggleVisibility = () => {
        setVisible(true);
    }

    const renderList = ({item,index}) => {
        return(
            <Text style={[styles.genretxt,{fontWeight:index==curr?"bold":"300",fontSize:index==curr?30:20}]} onPress={selectGenre.bind(this,index)}>{item}</Text>
        )
    }

    const renderItem = ({item,index}) => {

        return(
            <ListItem source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}} onPress={()=>{
                addEach(item)
                props.navigation.navigate('Detail')
            }}/>
            );
    }


    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.topcon}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Image style={styles.img} source={require("../../../assets/Images/arrow-2.png")}/>
        </TouchableOpacity>
        <Text style={styles.headertext}>Movies</Text>
        </View>
        <View style={styles.screencon}>
        <TouchableOpacity style={styles.headerbtn} onPress={toggleVisibility}>
        <Text style={styles.name}>{user.idList[curr]}</Text>
        <Image style={styles.down} source={require('../../../assets/Images/down.png')}/>
        </TouchableOpacity>
        </View>
        <FlatList
            data={user.list[curr]}
            numColumns={3}
            style={{marginLeft:10}}
            renderItem={renderItem}
        />
        <Modal animationType="slide" 
            transparent visible={visible} 
            presentationStyle="overFullScreen">
        <SafeAreaView style={styles.viewWrapper}>
        <FlatList
            style={{flex:0.8}}
            data={user.idList}
            renderItem={renderList}
            keyExtractor={(item,index)=>index.toString()}
        />
        </SafeAreaView>
        </Modal>
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
    },
    screencon:{
        flexDirection:"row",
        paddingHorizontal:15,
        paddingVertical:12
    },
    headerbtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flex:0.5
    },
    name:{
        color:"white",
        fontFamily:"Ubuntu-Medium",
        fontSize:20
    },
    down:{
        height:vw(12),
        width:vw(12),
        marginLeft:10
    },
    viewWrapper:{
        height:"100%",
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.8)",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
    },
    genretxt:{
        color:"white",
        fontFamily:"Ubuntu-Light",
        marginTop:20,
        textAlign:"center"
    }
})