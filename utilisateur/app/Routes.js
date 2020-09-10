import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import { Text,Button } from 'react-native';

import Login from './components/Login';
import Profile from './components/Profile';
import Registre from './components/Registe';
import Home from './components/Home';
import Create from './components/Create';
import Produit from './components/Produit';
import Conversations from './components/Conversations';
import Messages from './components/Messages';
import Reservation from './components/Reservation';
import Catégorie from './components/Catégorie'
import Historique from './components/Historique'

import { DrawerItems,StackNavigator,TabNavigator, createStackNavigator,createDrawerNavigator, createAppContainer,createSwitchNavigator,createBottomTabNavigator } from 'react-navigation'; 
/*
export default class Routes extends React.Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true} />
			      <Scene key="profile" component={Profile} title="profile" />
						<Scene key="registre" component={Registre} title="registre" />
			    </Stack>
			 </Router>
			)
	}
}
*/
/*
const Stylelist = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Register: {
    screen: Registre,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Home: {
    screen: createBottomTabNavigator({
      Home: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
        }),
      },
    }),
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  },
});

Stylelists= createAppContainer(Stylelist);

export default Stylelists;*/

const _Application = createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
      
      }),
    },
    Create: {
      screen: Create,
      navigationOptions: ({ navigation }) => ({
        navigationOptions: ({ navigation }) => ({
        }),
      }),
    },
    Produit: {
      screen: Produit,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Conversations: {
      screen: Conversations,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Messages: {
      screen: Messages,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Registre: {
      screen: Registre,
      navigationOptions: ({ navigation }) => ({
        
      }),
    },
    Reservation: {
      screen: Reservation,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Historique: {
      screen: Historique,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Catégorie: {
      screen: Catégorie,
      navigationOptions: ({ navigation }) => ({
  
      }),
    },
    Home: {
      screen: createBottomTabNavigator({
        Home: {
          screen: Home,
          navigationOptions: ({ navigation }) => ({
            headerStyle: {backgroundColor: '#4C3E54'},
        title: 'Home',
        headerTintColor: 'black',
          }),
        },
        Profile: {
          screen: Profile,
          navigationOptions: ({ navigation }) => ({
      
          }),
        },
   
      
      }),
  
    },
  }
);


const Application = createAppContainer(_Application);

export default Application;
