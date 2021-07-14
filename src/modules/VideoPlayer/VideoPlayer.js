import React, {Component, useEffect} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setVisible } from '../details/action';

export default function VideoPlay(props){

    const back = () => {
        dispatch(setVisible())
        const {goBack} = props.navigation
        Orientation.lockToPortrait()
        goBack()
    }

    const user=useSelector(state=>state.detail);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setVisible());
        Orientation.lockToLandscape()
    },[])


    return(
        <View style={styles.container}>
        <VideoPlayer 
                    source={require('../../assets/videos/videoplay.mp4')}
                    title={user.data.title}
                    onBack={() => back()}
                />
        </View>
    )
}

const styles= StyleSheet.create({

    container:{
        flex:1,
    }
})