import React from 'react';
import { Button, View,  StyleSheet ,AsyncStorage ,Text,StatusBar } from 'react-native';
import { StackNavigator, createDrawerNavigator,createStackNavigator, createAppContainer,createSwitchNavigator,createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json

import Login from './app/components/Login';
import Profile from './app/components/Profile';
import Registre from './app/components/Registe';
import Application from './app/Routes';
import {
  ActionSheetProvider,
  connectActionSheet,
  showActionSheetWithOptions,
} from '@expo/react-native-action-sheet';





export default class App extends React.Component {
  render() {

return (
  
  <View style={styles.tee}>
  <ActionSheetProvider>
  <Application/>
  </ActionSheetProvider>
  </View>

);


    }
}

const styles = StyleSheet.create({
  tee : {
    flex: 1,
  }
});


