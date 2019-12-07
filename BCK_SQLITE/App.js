import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Home from './screens/Home';
import Settings from './screens/Settings';
import calculadora from './screens/calculadora';
import adicionar from './screens/adicionar';
import listar from './screens/listar';
import editar from './screens/editar';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const RootStack = createStackNavigator({
  Home: Home,
  Settings: Settings,
  calculadora: calculadora,
  adicionar: adicionar,
  listar: listar,
  editar: editar
})
const App = createAppContainer(RootStack);

export default App;