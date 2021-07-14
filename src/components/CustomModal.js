import React, {useState} from 'react';
import { View ,Image,Modal ,TouchableOpacity,Text, StyleSheet,Dimensions} from 'react-native';
import { vw,vh } from '../assets/dimension';
import { useSelector } from 'react-redux';

export default function CustomModal(props,{navigation}) {

    const height=Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    const user=useSelector(state=>state.detail);

    return(
        <Modal animationType="slide" 
            transparent visible={props.visibility} 
            presentationStyle="overFullScreen">
            <TouchableOpacity style={[styles.viewWrapper,{height:height,width:width}]} onPress={props.toggle}>
                <TouchableOpacity style={[styles.modalView]} onPress={props.navigate}>
                <View style={styles.imgcon}>
                <Image style={styles.movicon} source={{uri:`https://image.tmdb.org/t/p/original${user.data.poster_path}`}}/>
                <View style={{flex:0.7}}>
                <View style={styles.imgcon}>
                <Text style={styles.titletext}>{user.data.title??user.data.name}</Text>
                <TouchableOpacity onPress={props.toggle}>
                <Image style={styles.backbtn} source={require('../assets/Images/close-3.png')}/>
                </TouchableOpacity>
                </View>
                <Text style={styles.btntext}>{user.data.release_date??user.data.first_air_date.slice(0,4)}</Text>
                <Text numberOfLines={4} style={styles.desctext}>{user.data.overview}</Text>
                </View>
                </View>
                <View style={styles.imgcon}>
                <TouchableOpacity style={styles.playbtn} onPress={props.playpress}>
        <Image style={styles.icon} source={require('../assets/Images/play-button-arrowhead.png')}/>
        <Text style={styles.playtext}>Play</Text>
        </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center",width:"50%"}}>
                <Image style={styles.forward} source={require('../assets/Images/download-2.png')}/>
                <Text style={styles.btntext}>Download</Text>
                </TouchableOpacity>
                </View>
                </TouchableOpacity>

            </TouchableOpacity>
        </Modal>
    )
}
const styles= StyleSheet.create({
    modalView: {
        backgroundColor:"rgb(50,50,50)",
        elevation: 5,
        borderRadius: 7,
        paddingHorizontal:15,
        paddingBottom:10,
        paddingTop:15,
    },
    btn:{
        backgroundColor:'#84FFFF',
        borderRadius:10,
        shadowRadius:5,
        shadowOpacity:0.2,
        shadowColor:"black"
    },
    viewWrapper: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        flexDirection:"column-reverse"
    },
    forward:{   
        height:vw(25),
        width:vw(20),
    },
    backbtn:{
        height:vw(30),
        width:vw(30),
    },
    imgcon:{
        flexDirection:"row",
        marginBottom:15,
        justifyContent:"space-between"
    },
    movicon:{
        height:"100%",
        width:vw(110),
        marginRight:10,
        borderRadius:5,
        flex:0.3
    },
    desctext:{
        fontFamily:'Ubuntu-Light',
        fontSize:16,
        fontWeight:"400",
        marginTop:10,
        color:'white',
    },
    btntext:{
        color:"rgb(150,150,150)",
        fontFamily:"Ubuntu-Light",
        fontWeight:"400",
        fontSize:15,
    },
    titletext:{
        fontFamily:"Ubuntu-Bold",
        fontSize:25,
        color:"white",
        flex:0.9
    },
    playbtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"50%",
        paddingVertical:10,
        borderRadius:4,
        backgroundColor:"white",
        marginBottom:10
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
})