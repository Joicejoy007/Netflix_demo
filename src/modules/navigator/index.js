import React from 'react';
import  {NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Trending from '../home/screens/TrendingMovie';
import Detail from '../details/Detail';
import MyList from '../home/screens/MyList';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Movies from '../home/screens/Movies';
import Tv from '../home/screens/Tv';
import { addTv } from '../home/action';
import { connect } from 'react-redux';
import TvDetail from '../details/TvDetail';
import Search from '../home/screens/Search';

export class Router extends React.Component{

  constructor(){
    super();
  }

  componentDidMount(){
    GenreList.map((el)=>{
      return fetch("https://api.themoviedb.org/3/"+el.link)
.then(response => response.json()).then(responseJson => {
    responseJson.results.map((ele)=>{
        ele.my_list=false;
        ele.rated=false;
        return el;
    })
   this.props.add(responseJson.results,el.genre);
   
})
.catch(err => {
	console.error(err);
});
    })
  }

  render(){
    const Stack = createStackNavigator();

    return(
      <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Trending' component={Trending}/>
      <Stack.Screen name='Detail'  component={Detail}/>
      <Stack.Screen name='My List'  component={MyList}/>
      <Stack.Screen name='Movies'  component={Movies}/>
      <Stack.Screen name='Tv'  component={Tv}/>
      <Stack.Screen name='Search'  component={Search}/>
      <Stack.Screen name='TvDetail'  component={TvDetail}/>
      <Stack.Screen name='Video'  component={VideoPlayer}/>
      </Stack.Navigator>
    );
  }
}

const GenreList = [
  {
      genre:"Trending",
      id:1,
      link:"trending/tv/week?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&page=1"
  },
  {
      genre:"Action and Adventure",
      id:10759,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10759"
  },
  {
      genre:"Kids",
      id:10762,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10762"
  },
  {
      genre:"Animation",
      id:16,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=16"
  },
  {
      genre:"Comedy",
      id:35,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=35"
  },
  {
      genre:"Crime",
      id:80,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=80"
  },
  {
      genre:"Documentry",
      id:99,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=99"
  },
  {
      genre:"Drama",
      id:18,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=18"
  },
  {
      genre:"Family",
      id:10751,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10751"
  },
  {
      genre:"News",
      id:10763,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10763"
  },
  {
      genre:"Mystery",
      id:9648,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=9648"
  },
  {
      genre:"Reality",
      id:10764,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10764"
  },
  {
      genre:"Sci-Fi & Fantasy",
      id:10765,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10765"
  },
  {
      genre:"TV Movie",
      id:10766,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10766"
  },
  {
      genre:"Talk",
      id:10767,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10767"
  },
  {
      genre:"War & Politics",
      id:10768,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=10768"
  },
  {
      genre:"Western",
      id:37,
      link:"discover/tv?api_key=86b767af21aed03f022fe5e01b409fe3&language=en-US&with_genres=37"
  },
]

const mapDispatchToProps = dispatch => {

  return {
    add:(data,id)=>{
      dispatch(addTv(data,id));
    }
  }
}

export default connect(null,mapDispatchToProps)(Router);