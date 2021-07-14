import React,{ useState,useRef,useEffect } from "react";
import { View, Text,Image, TextInput,TouchableOpacity,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import { vh, vw } from "../../../assets/dimension";
import CustomTextInput from "../../../components/CustomTextInput"
import { useDispatch,useSelector } from "react-redux";

import { addUser } from "../action";

export default function SignUp(props){

    const [firstName,setFirstName]= useState("");
    const [lastName, setLastName] = useState("");
    const [expiry,setExpiry]=useState("");
    const [cardNumber,setCardNumber]=useState("");
    const [cvv,setCvv]=useState("");
    const [checkexpiry,setCheckexpiry] = useState(false);
    const [errorexpiry,setErrorExpiry]=useState("");
    const lastname=useRef(null);
    const cardnumber=useRef(null);
    const expirydate=useRef(null);
    const cvvref=useRef(null);
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const changePlan = () => {
        props.navigation.navigate("Plan");
    }

    validateExpiry = () => {
        if(expiry.length<1){
            setErrorExpiry("Expiration month is required");
            return false;
        }
        else if((expiry.length==4||expiry.length==6) &&expiry.charAt(1)=='/' && Number(expiry.charAt(0))>0 && Number(expiry.charAt(expiry.length-2)+expiry.charAt(expiry.length-1))>21 && Number(expiry.charAt(expiry.length-2)+expiry.charAt(expiry.length-1))<46){
            return true;
        }
        else if((expiry.length==5||expiry.length==7) &&expiry.charAt(2)=='/' && Number(expiry.charAt(0)+expiry.charAt(1))>0 && Number(expiry.charAt(0)+expiry.charAt(1))<13 && Number(expiry.charAt(expiry.length-2)+expiry.charAt(expiry.length-1))>21 && Number(expiry.charAt(expiry.length-2)+expiry.charAt(expiry.length-1))<46){
            return true;
        }
        else{
            setErrorExpiry("Invalid Expiration Date!")
            return false;
        }
    }
    const addAndProceed = () => {
        if(checkexpiry&&cardNumber.length==12&!isNaN(cardNumber)&&firstName.length>1&&cvv.length==3&&!isNaN(cvv)){
        let data=user.currentUser;
        dispatch(addUser(data));
        props.navigation.navigate('Login');
    }
    }

    useEffect(() => {
        setCheckexpiry(validateExpiry());
    }, [expiry])

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.headerwrapper}>
        <Image style={styles.logo} source={require('../../../assets/Images/netflix-white.png')}/>
        <Text style={styles.signintext} onPress={()=>props.navigation.navigate('Login')}>SIGN IN</Text>
        </View>
        <View style={{flex:1}}>
        <ScrollView style={styles.textinputwrapper} showsVerticalScrollIndicator={false}>
        <Text style={styles.lighttext}>STEP 3 OF 3</Text>
        <Text style={styles.steptext}>Set up your credit or debit card</Text>
        <CustomTextInput
            title="First Name"
            onChangeText={(text)=>setFirstName(text)}
            onSubmitEditing={()=>lastname.current.focus()}
            value={firstName}
            validation={firstName.length>0}
            errortext={"First Name is required!"}
        />
        <CustomTextInput
            title="Last Name"
            onChangeText={(text)=>setLastName(text)}
            value={lastName}
            InputReference={lastname}
            validation={true}
            onSubmitEditing={()=>cardnumber.current.focus()}
        />
        <CustomTextInput
            title="Card Number"
            InputReference={cardnumber}
            onChangeText={(text)=>setCardNumber(text)}
            validation={cardNumber.length==12&&!isNaN(cardNumber)}
            errortext="Invalid Card Number!"
            keyboardType='numeric'
            onSubmitEditing={()=>expirydate.current.focus()}
        />
        <CustomTextInput
            title="Expiration Date (MM/YY)"
            onChangeText={(text)=>setExpiry(text)}
            value={expiry}
            InputReference={expirydate}
            validation={checkexpiry}
            errortext={errorexpiry}
            onSubmitEditing={()=>cvvref.current.focus()}
        />
        <CustomTextInput
            title="Security Code (CVV)"
            InputReference={cvvref}
            onChangeText={(text)=>setCvv(text)}
            validation={cvv.length==3&&!isNaN(cvv)}
            errortext="Enter a valid CVV code"
            keyboardType='numeric'
        />
        <View style={styles.plancon}>
        <View>
        <Text style={[styles.changetext,{color:"black"}]}>&#8377; {user.currentUser.plan.price}/month</Text>
        <Text style={[styles.lighttext,{color:"#888",marginTop:6,fontWeight:"400"}]}>{user.currentUser.plan.name} Plan</Text>
        </View>
        <Text style={styles.changetext} onPress={changePlan}>Change</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={addAndProceed}>
        <Text style={styles.btntext}>START MEMBERSHIP</Text>
        </TouchableOpacity>
        </ScrollView>
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
        paddingTop:10
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
        marginBottom:15
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
    },
    plancon:{
        backgroundColor:"#E6E6E6",
        width:"100%",
        height:vh(68),
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        borderRadius:4,
        padding:15
    },
    changetext:{
        color:"blue",
        fontFamily:"Ubuntu-Bold",
        fontSize:19
    },
})