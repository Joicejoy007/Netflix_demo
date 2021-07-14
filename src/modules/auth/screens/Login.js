import React,{ useRef, useState } from "react";
import { View, Text,Image, TouchableOpacity,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { vh, vw } from "../../../assets/dimension";
import CustomText from "../../../components/CustomText"
import { addProfile } from "../../profile/action";
import { signInAction } from "../action";

export default function Login(props){

    const [email,setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [visible,setVisible]=useState(true)
    const passwordref = useRef(null);

    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();

    const viewPass = () => {
        setVisible(!visible);
    }

    const signIn = () => {
        let flag=0;
        user.data.map((el)=>{
            if(el.email==email&&el.password==password){
                flag=1;
                dispatch(addProfile(el));
            }
            return el;
        })
        if(flag==1){
            dispatch(signInAction());
        }
        else{
            alert("Invalid Email Address or password");
        }
    }

    let i=visible?"SHOW":"HIDE";
    let flag=email.length>4&&password.length>3?1:0;

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.headerwrapper}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Tutorial")}>
        <Image source={require('../../../assets/Images/arrow-2.png')} style={styles.back}/>
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../../../assets/Images/netflix-logo.png')}/>
        </View>
        <ScrollView style={styles.textinputwrapper}>
        <CustomText
            title='Email Address'
            onChangeText={(text)=>setEmail(text)}
            value={email}
            onSubmitEditing={()=>passwordref.current.focus()}
        />
        <CustomText
            title="Password"
            onChangeText={(text)=>setPassword(text)}
            value={password}
            InputReference={passwordref}
            secureTextEntry={visible}
            onPress={viewPass}
            hidetext={i}
        />
        <TouchableOpacity style={[styles.btn,{backgroundColor:flag?"red":"#050505",borderWidth:flag?0:2}]} onPress={signIn}>
         <Text style={styles.btntext}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.helptext}>Need Help?</Text>
        <Text style={styles.signuptext} onPress={()=>props.navigation.navigate("Tutorial")}>New to Netflix? Sign up now.</Text>
        </ScrollView>
         
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#050505"
    },
    textinputwrapper:{
        top:"20%",
        paddingHorizontal:10
    },
    headerwrapper:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:13,
        paddingTop:5
    },
    logo:{
        height:vw(28),
        width:vw(100)
    },
    back:{
        height:vw(20),
        width:vw(20),
        marginRight:20
    },
    btn:{
        borderRadius:8,
        borderColor:"white",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:vh(50),
        marginTop:15
    },
    btntext:{
        fontFamily:"Ubuntu-Medium",
        fontSize:22,
        color:"white",
    },
    signuptext:{
        fontFamily:"Ubuntu-Light",
        fontWeight:"700",
        fontSize:19,
        color:"white",
        alignSelf:"center",
        marginTop:30
    },
    helptext:{
        color:"rgb(200,200,200)",
        fontSize:18,
        fontFamily:"Ubuntu-Light",
        fontWeight:"500",
        alignSelf:"center",
        marginTop:30
    }
})