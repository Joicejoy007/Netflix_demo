import * as React from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';
import { vw,vh } from '../assets/dimension';


export default class Stars extends React.Component {
  constructor(props){
    super(props);
    this.state={isFocused:false,firstpress:false}
  }
  render(){
  return (
    <View>
  <View style={[styles.textcon,,{borderColor:this.state.firstpress?this.props.validation?"green":"red":"gray"}]}>{
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
     onFocus={()=>this.setState({isFocused:true,firstpress:true})}
     onBlur={()=>this.setState({isFocused:false})}
     secureTextEntry={this.props.secureTextEntry}
     keyboardType={this.props.keyboardType}
     placeholderTextColor="rgb(150,150,150)"
      />
    </View>
    {
        this.state.firstpress&&!this.props.validation&&(
            <Text style={styles.errortext}>{this.props.errortext}</Text>
        )
    }
    </View>
  );
}
}
const styles=StyleSheet.create({
  textcon:{
    height:vh(55),
    width:"100%",
    justifyContent:"center",
    paddingHorizontal:15,
    marginBottom:15,
    borderWidth:1,
    paddingVertical:5,
    borderRadius:3
  },
  textinp:{
    width:"100%",
    height:"100%",
    color:"black",
    fontSize:20,
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
      color:"rgb(150,150,150)",
      top:"15%"
      },
  errortext:{
      color:"red",
      fontFamily:"Ubuntu-Light",
      fontWeight:"300",
      marginTop:-10,
      marginBottom:10
  }
})