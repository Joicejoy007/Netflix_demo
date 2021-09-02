import React,{ useState,useRef } from "react";
import { View, Text,Image,TouchableOpacity,StyleSheet,SafeAreaView,ScrollView} from "react-native";
import { vh, vw } from "../../../assets/dimension";
import { useSelector,useDispatch } from "react-redux";

import { addCurrentUser } from "../action";

export default function SignUp(props){

    const [currentIndex, setCurrentIndex] = useState(0);
    const descrdata=["Watch all you want. Ad-free.","Recommendations just for you.","Change or cancel your plan anytime."]
    const plandata= [{name:"Mobile",price:99,video:"Good",resolution:"480p",devices:["Phone","Tablet"]},{name:"Basic",price:299,video:"Good",resolution:"480p",devices:["Phone","Tablet","Computer","TV"]},{name:"Standard",price:399,video:"Better",resolution:"1080p",devices:["Phone","Tablet","Computer","TV"]},{name:"Premium",price:499,video:"Best",resolution:"4K+HDR",devices:["Phone","Tablet","Computer","TV"]}]
    const dispatch = useDispatch();

    const user=useSelector(state=>state.user);
    
    const addAndProceed = () => {
        let data=user.currentUser;
        data.plan=plandata[currentIndex];
        dispatch(addCurrentUser(data));
        props.navigation.navigate("Payment");
    }

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.headerwrapper}>
        <Image style={styles.logo} source={require('../../../assets/Images/netflix-white.png')}/>
        <Text style={styles.signintext} onPress={()=>props.navigation.navigate('Login')}>SIGN IN</Text>
        </View>
        <View style={styles.textinputwrapper}>
        <Text style={styles.lighttext}>STEP 2 OF 3</Text>
        <Text style={styles.steptext}>Choose the plan that's right for you</Text>
        {
            descrdata.map((el)=>{
                return(
        <View style={styles.desccon}>
        <Image style={styles.tick} source={require("../../../assets/Images/check.png")} />
        <Text style={styles.sometext}>{el}</Text>
        </View>);
            }
        )
        }
        <View style={styles.desccon}>
        {
            plandata.map((el,index)=>{
                return(
                    <TouchableOpacity style={[styles.btn,{backgroundColor:currentIndex==index?"red":"#E57373"}]} onPress={()=>setCurrentIndex(index)}>
                    <Text style={styles.btntext}>{el.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <Text style={styles.headertext}>Monthly price</Text>
        <View style={styles.desccon}>
        {
            plandata.map((el,index)=>{
                return(
                    <View style={{flex:0.25}}>
                    <Text style={[styles.helptext,{color:currentIndex==index?"red":"rgb(100,100,100)"}]}>&#8377; {el.price}</Text>
                    </View>
                )
            })
        }
        </View>
        <View style={styles.footer}/>
        <Text style={styles.headertext}>Video Quality</Text>
        <View style={styles.desccon}>
        {
            plandata.map((el,index)=>{
                return(
                    <View style={{flex:0.25}}>
                    <Text style={[styles.helptext,{color:currentIndex==index?"red":"rgb(100,100,100)"}]}>{el.video}</Text>
                    </View>
                )
            })
        }
        </View>
        <View style={styles.footer}/>
        <Text style={styles.headertext}>Resolution</Text>
        <View style={styles.desccon}>
        {
            plandata.map((el,index)=>{
                return(
                    <View style={{flex:0.25}}>
                    <Text style={[styles.helptext,{color:currentIndex==index?"red":"rgb(100,100,100)"}]}>{el.resolution}</Text>
                    </View>
                )
            })
        }
        </View>
        <View style={styles.footer}/>
        <Text style={styles.headertext}>Devices you can use to watch</Text>
        <View style={styles.desccon}>
        {
            plandata.map((el,index)=>{
                return(
                    <View style={{flex:0.25}}>{
                        el.devices.map((ele) => {
                            let i="";
                            if(ele=="Phone"){
                                i=currentIndex==index?require("../../../assets/Images/smartphone-2.png"):require("../../../assets/Images/smartphone.png")
                            }
                            else if(ele=="Tablet"){
                                i=currentIndex==index?require("../../../assets/Images/tablet-2.png"):require("../../../assets/Images/tablet.png")
                            }
                            else if(ele=="Computer"){
                                i=currentIndex==index?require("../../../assets/Images/laptop-2.png"):require("../../../assets/Images/laptop.png")
                            }
                            else if(ele=="TV"){
                                i=currentIndex==index?require("../../../assets/Images/television-2.png"):require("../../../assets/Images/television.png")
                            }
                            return(
                                <View>
                                <Image style={styles.back} source={i}/>
                                <Text style={[styles.devicename,{color:currentIndex==index?"red":"rgb(100,100,100)"}]}>{ele}</Text>
                                </View>
                    );
                        }
                        )
                    }
                    </View>
                )
            })
        }
        </View>
        <TouchableOpacity style={styles.continue} onPress={addAndProceed}>
        <Text style={styles.btntext}>CONTINUE</Text>
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
        marginTop:15,
        flex:1
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
        width:vw(90),
    },
    back:{
        height:vw(20),
        width:vw(20),
        alignSelf:"center",
        marginBottom:4
    },
    btn:{
        alignItems:"center",
        borderRadius:3,
        justifyContent:"center",
        width:"24%",
        height:vh(70),
        marginTop:10,
        marginRight:5
    },
    btntext:{
        fontFamily:"Ubuntu-Medium",
        fontSize:17,
        color:"white",
    },
    steptext:{
        fontFamily:"Ubuntu-Light",
        fontWeight:"700",
        fontSize:25,
        color:"black",
        marginBottom:5
    },
    helptext:{
        fontSize:17,
        fontFamily:"Ubuntu-Light",
        fontWeight:"500",
        alignSelf:"center",
    },
    signintext:{
        fontFamily:"Ubuntu-Medium",
        fontSize:19,
        fontWeight:"700"
    },
    sometext:{
        fontFamily:"Ubuntu-Light",
        fontSize:17,
        fontWeight:"400"
    },
    headertext:{
        fontSize:16,
        fontFamily:"Ubuntu-Light",
        fontWeight:"500",
        marginVertical:10,
        alignSelf:"center"
    },
    lighttext:{
        fontFamily:"Ubuntu-Light",
        fontSize:16,
        marginBottom:7,
        fontWeight:"400"
    },
    desccon:{
        flexDirection:"row",
        paddingVertical:10
    },
    tick:{
        height:vw(20),
        width:vw(20),
        marginRight:25
    },
    footer:{
        backgroundColor:"rgb(220,220,220)",
        height:vh(1),
        width:"100%",
        marginVertical:10
    },
    devicename:{
        fontSize:14,
        fontFamily:"Ubuntu-Light",
        fontWeight:"500",
        alignSelf:"center",
        marginBottom:10
    },
    continue:{
        height:vh(50),
        width:"100%",
        marginVertical:15,
        backgroundColor:"red",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:4
    }
});