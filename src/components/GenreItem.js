import * as React from 'react';
import { View,Text, StyleSheet, FlatList } from 'react-native';
import { vh } from '../assets/dimension';

export default class Custom extends React.Component {
  constructor(props){
    super(props);
  }

  renderGenre = ({item,index}) => {
        
    var i;
    GenreList.map((el)=>{
        if(el.id==item)
        i=el.genre;
        return el;
    })
    return(
        <Text style={styles.genre}>{i}</Text>
    )
}

separator = () => {
  return(
    <View style={styles.sepcon}/>
  )
}

  render(){
  return (
    <FlatList
    horizontal={true}
    style={{marginTop:6}}
        data={this.props.genres}
        renderItem={this.renderGenre}
        keyExtractor={(item,index)=>index.toString()}
        ItemSeparatorComponent={this.separator}
    />
  );
}
}

const styles=StyleSheet.create({
    btn:{
        height:vh(45),
        marginTop:25,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,
        alignSelf:'center', 
        borderRadius:10
    },
    btntext:{
      fontFamily:"Ubuntu-Bold",
      color:"white",
      fontSize:18
    },
    genre:{
      fontFamily:"Ubuntu-Light",
      fontSize:15,
      color:"white",
      fontWeight:"400"
  },
  sepcon:{
    backgroundColor:"red",
    height:3,
    width:3,
    marginTop:9,
    marginHorizontal:10,
    borderRadius:3
  }
})

const GenreList = [
  {
      genre:"Trending",
      id:1,
      link:"trending/movie/week?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&page=1"
  },
  {
      genre:"Action",
      id:28,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=28"
  },
  {
      genre:"Adventure",
      id:12,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=12"
  },
  {
      genre:"Animation",
      id:16,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=16"
  },
  {
      genre:"Comedy",
      id:35,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=35"
  },
  {
      genre:"Crime",
      id:80,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=80"
  },
  {
      genre:"Documentry",
      id:99,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=99"
  },
  {
      genre:"Drama",
      id:18,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=18"
  },
  {
      genre:"Family",
      id:10751,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10751"
  },
  {
      genre:"Fantasy",
      id:14,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=14"
  },
  {
      genre:"History",
      id:36,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=36"
  },
  {
      genre:"Horror",
      id:27,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=27"
  },
  {
      genre:"Music",
      id:10402,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10402"
  },
  {
      genre:"Mystery",
      id:9648,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=9648"
  },
  {
      genre:"Romance",
      id:10749,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10749"
  },
  {
      genre:"Science Fiction",
      id:878,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=878"
  },
  {
      genre:"TV Movie",
      id:10770,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10770"
  },
  {
      genre:"Thriller",
      id:53,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=53"
  },
  {
      genre:"War",
      id:10752,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10752"
  },
  {
      genre:"Western",
      id:37,
      link:"discover/movie?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=37"
  },
]