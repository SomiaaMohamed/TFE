import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Button,
  View,

  Text
} from 'react-native';
import { StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { login } from './UserFunctions';
import { Actions } from 'react-native-router-flux';
import Logo from './Logo'
import UserFunctions from './UserFunctions';
import Dialog from "react-native-dialog";
import { Dialogue } from '../components/Dialogue'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      dialogVisible: false

    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };


  profile_route() {
    this.props.navigation.navigate('Profile')
  }

  registre_route() {
    this.props.navigation.navigate('Registre')
  }

  // home_route(u) {
  //  this.props.navigation.navigate('',{ newMessage:"testtt" })
  // }

  componentDidMount() {
   this._loadInitState().done();
  }

  _loadInitState = async () => {

    var value = await AsyncStorage.getItem('token');
    if (value !== null) {
      this.props.navigation.navigate('Profile', { id: "testtt" });
    }
  }


  render() {
    return (

      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>
          <Logo />
          <TextInput
            style={styles.textInput} placeholder='Email'
            onChangeText={(email) => this.setState({ email })}
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={styles.textInput} placeholder='Password'
            onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={this.login}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.registreText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Registre')}><Text style={styles.registreButton}> Registre</Text></TouchableOpacity>

          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialogue description='Email or Password Provided is not Correct' title='Error Login' />
            <Dialog.Button label="OK" onPress={this.handleCancel} />
          </Dialog.Container>

        </View>
      </KeyboardAvoidingView>

    );
  }


  login = () => {
    fetch('http://192.168.0.14:6000/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.succes === true) {
          AsyncStorage.setItem('token', responseJson.token)
          AsyncStorage.setItem('email', responseJson.user.email)
          AsyncStorage.setItem('first_name', responseJson.user.first_name)
          AsyncStorage.setItem('last_name', responseJson.user.last_name)
          AsyncStorage.setItem('id', responseJson.user._id)
          AsyncStorage.getItem('token')
            .then(email => {

            })
          this.props.navigation.navigate('Profile', { newMessage: responseJson.user.newMessage });
        }
        else {
          this.showDialog()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#006DCD',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textInput: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10

  },
  btn: {
    width: 300,
    backgroundColor: '#CC0000',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  registreText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  registreButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  }
});
