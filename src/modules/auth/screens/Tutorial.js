import React,{useState} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View,Text,Image,SafeAreaView, FlatList,TouchableOpacity, Dimensions ,StyleSheet} from 'react-native';
import { vh, vw } from '../../../assets/dimension';
import { useDispatch } from 'react-redux';
import { setShowApp } from '../../auth/action';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

export default function Tutorial({navigation}) {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');
    const insets=useSafeAreaInsets();

    const dispatch = useDispatch();

    const tutorialEnd = () => {
        dispatch(setShowApp());
    }


    const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

    const renderItem = ({item,index}) => {

        return(
            <View style={[styles.container,{width}]}>
            <Image source={item.image} style={styles.imageStyle} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.text}</Text>
            </View>
          </View>
        )

    }

    return(
        <SafeAreaView style={styles.fullcon}>
        <FlatList
            style={{flex:0.8}}
            data={slides}
            renderItem={renderItem}
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
            setSliderPage(event);
          }}
        />
        <View style={[styles.topwrapper,{top:insets.top}]}>
        <Image style={styles.appIcon} source={require("../../../assets/Images/n.png")}/>
        <Text style={styles.signintext} onPress={()=>navigation.navigate("Login")}>SIGN IN</Text>
        </View>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(4).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('SignUp')}>
            <Text style={styles.signuptext}>GET STARTED</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height:"80%",
        width:"100%"
    },
    fullcon:{
        flex:1,
        backgroundColor:"#101010",
    },
    container:{
        alignItems:"center",
        flex:0.25
    },
    wrapper: {
      alignItems: 'center',
      height:"40%",
      paddingTop:15,
      paddingHorizontal:20,
      position:"absolute",
      bottom:0,
      left:0,
      right:0,
      backgroundColor:"rgba(0,0,0,0.7)"
    },
    appIcon:{
        height:vw(30),
        width:vw(30),
    },
    topwrapper:{
        position:"absolute",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:20,
        backgroundColor:"rgba(21,21,21,0.7)",
        paddingTop:10,
        paddingBottom:20,
        left:0,
        right:0
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily:"Ubuntu-Bold",
      color:"white",
      textAlign:"center"
    },
    signintext:{
        fontSize:18,
        fontFamily:"Ubuntu-Light",
        fontWeight:"800",
        color:"white"
    },
    paragraph: {
      fontSize: 17,
      marginHorizontal:30,
      textAlign:"center",
      fontFamily:"Ubuntu-Light",
      fontWeight:'400',
      color:"rgb(200,200,200)",
      textAlign:"center"
    },
    paginationWrapper: {
      bottom: "18%",
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationDots: {
      height: vh(10),
      width: vw(10),
      borderRadius: 10 / 2,
      backgroundColor: 'rgb(200,200,200)',
      marginLeft: 10,
    },
    btn:{
        backgroundColor:"#E53935",
        width:"100%",
        marginHorizontal:10,
        height:vh(50),
        alignItems:"center",
        justifyContent:"center",
        bottom:"4%"
    },
    signuptext:{
        fontFamily:"Ubuntu-Light",
        color:"white",
        fontSize:18,
        fontWeight:"400"
    }
  });

  const slides = [
    {
      key: 'k1',
      title: 'Unlimited entertainment, one low price.',
      text: 'All of Netflix, starting at just $ 30.',
      image: require('../../../assets/Images/banner1.png')
    },
    {
      key: 'k2',
      title: 'Download and watch offline',
      text: 'Always have something to watch offline.',
      image: require('../../../assets/Images/tut2.jpg')

    },
    {
      key: 'k3',
      title: 'No pesky contracts',
      text: 'Join today,cancel anytime.',
      image: require('../../../assets/Images/download_netflix_ios.png')

    },
    {
      key: 'k4',
      title: 'Watch everywhere',
      text: 'Stream on your phone, tablet, laptop, TV and more.',
      image: require('../../../assets/Images/tut4.jpg')
  
    },
  ];
