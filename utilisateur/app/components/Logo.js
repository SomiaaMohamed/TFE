import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={ styles.img}
          			source={require('../images/logo1.jpg')}/>
          		<Text style={styles.logoText}>Welcome to Donate App.</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({

	img : {
		width:100, 
		height: 100,
		borderTopLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderBottomLeftRadius: 50,
		borderTopRightRadius: 50,
	},
  container : {
    justifyContent:'flex-end',
		alignItems: 'center',
		
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});