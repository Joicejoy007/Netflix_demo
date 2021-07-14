import {persistor,store} from './src/store';
import React from 'react';
import {Provider} from 'react-redux';
import Router from './src/router/index';

export default class App extends React.Component{
  
  render(){
    return(
      <Provider store={store}>
      <Router/>
      </Provider>
    );
  }

}