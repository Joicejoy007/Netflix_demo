import React, {useState} from 'react';
import { Image,StyleSheet ,TouchableOpacity} from 'react-native';
import { useSelector  } from 'react-redux';
import { vw, vh } from '../assets/dimension';

export default function ListItem(props){

    return(
        <TouchableOpacity style={{shadowColor:"black",shadowRadius:1,shadowOpacity:0.1}} onPress={props.onPress}>
        <Image style={styles.img} source={props.source}/>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    img:{
        height:vh(130),
        width:vw(110),
        marginRight:10,
        marginTop:10,
        borderRadius:5,
    }
})