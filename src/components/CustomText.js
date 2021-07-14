import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image,TextInput } from 'react-native';
import { vw,vh } from '../assets/dimension';


export default class Stars extends React.Component {
  constructor(props){
    super(props);
    this.state={isFocused:false}
  }
  render(){
  return (
  <View style={[styles.textcon,{backgroundColor:this.state.isFocused?"rgb(70,70,80)":'rgb(50,50,50)'}]}>
  <View style={{flex:0.82}}>{
    this.state.isFocused&&
<Text style={styles.place}>{this.props.title}</Text>
}
     <TextInput 
     style={[styles.textinp]}
     placeholder={this.state.isFocused?"":this.props.title}
     onChangeText={this.props.onChangeText}
     onSubmitEditing={this.props.onSubmitEditing}
     ref={this.props.InputReference}
     value={this.props.value}
     onFocus={()=>this.setState({isFocused:true})}
     onBlur={()=>this.setState({isFocused:false})}
     secureTextEntry={this.props.secureTextEntry}
     keyboardType={this.props.keyboardType}
     placeholderTextColor="rgb(150,150,150)"
      />
      </View>
      { 
      this.props.value.length>0&&(<Text style={styles.icon} onPress={this.props.onPress}>{this.props.hidetext}</Text>)
      }
    </View>
  );
}
}
const styles=StyleSheet.create({
  textcon:{
    borderRadius:10,
    height:vh(55),
    width:"100%",
    paddingHorizontal:15,
    justifyContent:"space-between",
    backgroundColor:"rgb(50,50,50)",
    flexDirection:'row',
    marginBottom:15,
    alignItems:"center"
  },
  textinp:{
    width:"85%",
    height:"80%",
    color:"white",
    fontSize:23,
  },
  icon:{
    fontFamily:"Ubuntu-Light",
    fontSize:20,
    fontWeight:"400",
    color:"rgb(120,120,120)",
    textAlign:"center",
    flex:0.18
  },
  place:{
    color:"rgb(225,225,225)",
    top:"10%"
    },
})