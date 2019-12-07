import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Posts from './screens/posts';
import Camera from './screens/camera';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const RootStack = createStackNavigator({
  Posts: Posts,
  Camera: Camera,
  
},
{
  initialRouteName: 'Posts',
  headerMode: 'none',
}
)
const App = createAppContainer(RootStack);

export default App;