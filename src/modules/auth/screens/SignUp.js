import React,{ useState,useRef ,useEffect} from "react";
import { View, Text,Image, TextInput,TouchableOpacity,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import { vh, vw } from "../../../assets/dimension";
import CustomTextInput from "../../../components/CustomTextInput"
import { useDispatch } from "react-redux";

import { addCurrentUser } from "../action";

export default function SignUp(props){

    const [email,setEmail]= useState("");
    const [checkEmail,setCheckEmail]=useState(false);
    const [checkpass,setCheckpass]=useState(false);
    const [errormail,setErrormail]=useState("");
    const [errorpass,setErrorpass]=useState("");
    const [password, setPassword] = useState("");
    const passwordref=useRef(null);
    const dispatch = useDispatch();

    const validateEmail = () => {
        if (email.length < 1) {
            setErrormail("Email is Required")
            return false;
          } else if (
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
          ) {
            return true;
          } else {
            setErrormail("Email Address is Invalid");
            return false;
          }
    }

    const validatePassword = () => {
        if(password.length<1){
            setErrorpass("Pssword is required");
            return false;
        }
        else if(password.length>4 && password.length<50){
            return true;
        }
        else {
            setErrorpass("Password Should be between 4 and 50 characters");
            return false;
        }
    }

    const addAndProceed = () => {
        if(checkpass&&checkEmail){
        let data={
            email:email,
            password:password
        }
        dispatch(addCurrentUser(data));
        props.navigation.navigate('Plan');
    }
    }

    useEffect(() => {
        setCheckEmail(validateEmail());
        setCheckpass(validatePassword())
    }, [email,password])

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.headerwrapper}>
        <Image style={styles.logo} source={require('../../../assets/Images/netflix-white.png')}/>
        <Text style={styles.signintext} onPress={()=>props.navigation.navigate('Login')}>SIGN IN</Text>
        </View>
        <View style={styles.textinputwrapper}>
        <Text style={styles.lighttext}>STEP 1 OF 3</Text>
        <Text style={styles.steptext}>Enter your email and password to start your membership</Text>
        <Text style={styles.sometext}>Just two more steps and you're done! We hate paperwork, too.</Text>
        <Text style={[styles.headertext]}>Create your account.</Text>
        <CustomTextInput
            title="Email"
            onChangeText={(text)=>setEmail(text)}
            onSubmitEditing={()=>passwordref.current.focus()}
            value={email}
            validation={checkEmail}
            errortext={errormail}
        />
        <CustomTextInput
            title="Password"
            placeholder="Password"
            onChangeText={(text)=>setPassword(text)}
            value={password}
            InputReference={passwordref}
            validation={checkpass}
            errortext={errorpass}
            
        />
        <TouchableOpacity style={styles.btn} onPress={addAndProceed}>
        <Text style={styles.btntext}>CONTINUE</Text>
        </TouchableOpacity>
        </View>
        
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#FFF",
    },
    textinputwrapper:{
        paddingHorizontal:20,
        marginTop:50
    },
    headerwrapper:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20,
        justifyContent:"space-between",
        paddingVertical:15
    },
    logo:{
        height:vw(25),
        width:vw(90)
    },
    back:{
        height:vw(20),
        width:vw(20),
        marginRight:20
    },
    btn:{
        alignItems:"center",
        borderRadius:3,
        justifyContent:"center",
        width:"100%",
        height:vh(48),
        marginTop:10,
        backgroundColor:"rgb(255,0,20)"
    },
    btntext:{
        fontFamily:"Ubuntu-Medium",
        fontSize:22,
        color:"white",
    },
    steptext:{
        fontFamily:"Ubuntu-Light",
        fontWeight:"700",
        fontSize:25,
        color:"black",
    },
    helptext:{
        color:"rgb(200,200,200)",
        fontSize:18,
        fontFamily:"Ubuntu-Light",
        fontWeight:"500",
        alignSelf:"center",
        marginTop:30
    },
    signintext:{
        fontFamily:"Ubuntu-Medium",
        fontSize:19,
        fontWeight:"700"
    },
    sometext:{
        fontFamily:"Ubuntu-Light",
        fontSize:21,
        marginVertical:15,
        fontWeight:"300"
    },
    headertext:{
        fontSize:21,
        fontFamily:"Ubuntu-Light",
        fontWeight:"600",
        marginBottom:20
    },
    lighttext:{
        fontFamily:"Ubuntu-Light",
        fontSize:16,
        marginBottom:7,
        fontWeight:"400"
    }
})