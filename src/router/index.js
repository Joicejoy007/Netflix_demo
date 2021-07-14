import React from 'react';
import  {NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../modules/navigator';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import Tutorial from '../modules/auth/screens/Tutorial';
import Login from '../modules/auth/screens/Login';
import SignUp from '../modules/auth/screens/SignUp';
import Plan from '../modules/auth/screens/Plan';
import Payment from "../modules/auth/screens/Payment";
import upcoming from '../modules/profile/upcoming';
import Profile from '../modules/profile/profile';

export class Router extends React.Component{

  constructor(){
    super();
  }

  render(){
    const Stack = createStackNavigator();
    const Tabs = createBottomTabNavigator();

    if(this.props.user.isLoggedIn){

    return(
      <NavigationContainer>
      <Tabs.Navigator screenOptions={
        ({route})=>({
          tabBarIcon:({focused,icon,size})=>{
            let i;
              if(route.name==="Home"){
                i=focused?require("../assets/Images/home.png"):require("../assets/Images/home-2.png");
              }
              else if(route.name==="Coming Soon"){
                i=focused?require("../assets/Images/video-marketing.png"):require("../assets/Images/video-marketing-2.png");
              }
              else if(route.name==="Profile"){
                i=focused?require("../assets/Images/user.png"):require("../assets/Images/user-2.png");
              }
              return <Image style={{height:25,width:25}} source={i}/>;
          },
        })
      }
        tabBarOptions={{
          activeTintColor: '#FFF',
          inactiveTintColor: 'gray',
         style:{ backgroundColor:"#202020"}
        }}
      >
      <Tabs.Screen name="Home" component={Home} options={{tabBarVisible:this.props.detail.isVisible}}/>
      <Tabs.Screen name="Coming Soon" component={upcoming}  options={{tabBarVisible:this.props.detail.isVisible}}/>
      <Tabs.Screen name="Profile" component={Profile}  options={{tabBarVisible:this.props.detail.isVisible}}/>
      </Tabs.Navigator>
      </NavigationContainer>
    );
      }


    else{
        
    return(
          <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Tutorial" component={Tutorial} />
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Plan' component={Plan}/>
            <Stack.Screen name='Payment' component={Payment}/>
            </Stack.Navigator>
          </NavigationContainer>
          </SafeAreaProvider>
        )
      }
  }
}

const mapStateToProps = (state) => {
    return {
      user:state.user,
      detail:state.detail
    }
}

export default connect(mapStateToProps,null)(Router);
