import React from "react";
import { View,Image,SafeAreaView,Text, StyleSheet} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { vw } from "../../assets/dimension";
import { signInAction } from "../auth/action";

export default function Profile(props){

    const dispatch=useDispatch();
    const user=useSelector(state=>state.profile)

    const signoutAction = () => {
        dispatch(signInAction());
    }

    return(
        <SafeAreaView style={styles.container}>
        <Text style={styles.signout} onPress={signoutAction}>Sign Out</Text>
        <View style={styles.footer}/>
        <Text style={styles.emailtext}>Your Email : {user.email}</Text>
        <View style={styles.footer}/>
        <Text style={styles.emailtext}>Your Plan : {user.plan.name} {user.plan.price}/month</Text>
        <View style={styles.footer}/>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Image style={styles.img} source={require('../../assets/Images/check-2.png')}/>
        <Text style={styles.emailtext} onPress={()=>props.navigation.navigate('My List')}>My List</Text>
        </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#101010",
        paddingHorizontal:15,
    },
    signout:{
        fontFamily:"Ubuntu-Medium",
        fontSize:18,
        color:"white",
        marginVertical:10,
        marginHorizontal:15,
        alignSelf:"flex-end"
    },
    footer:{
        height:1,
        width:"100%",
        marginVertical:20,
        backgroundColor:"rgb(150,150,150)"
    },
    emailtext:{
        fontFamily:"Ubuntu-Medium",
        color:"white",
        fontSize:20,marginLeft:10
    },
    img:{
        height:vw(20),
        width:vw(20),
        marginLeft:10
    }
})