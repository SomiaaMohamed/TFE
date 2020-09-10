import React from 'react';
import { 
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Button,
     View, 
    Text } from 'react-native';
import { StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation'; 
import {Actions} from 'react-native-router-flux';
import Logo from './Logo';
import Dialog from "react-native-dialog";
import { Dialogue } from '../components/Dialogue'


export default class Registre extends React.Component {

constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        cPassword:'',
        first_name:'',
        last_name:'',
        errorEmpty: false,
    }
}

showDialog = () => {
  this.setState({ errorEmpty: true });
};

handleCancel = () => {
  this.setState({ errorEmpty: false });
};

login_route() {
  Actions.login()
}



render() {
    return (

        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        
        <View style={styles.container}>
        <Logo/>
            <TextInput
            style={styles.textInput} placeholder='Email'
            onChangeText={ (email) => this.setState({email}) }
            underlineColorAndroid='transparent'
            />

<TextInput
            style={styles.textInput} placeholder='Password'
            onChangeText={ (password) => this.setState({password}) }
            underlineColorAndroid='transparent'
            />
            <TextInput
            style={styles.textInput} placeholder='Last Name'
            onChangeText={ (last_name) => this.setState({last_name}) }
            underlineColorAndroid='transparent'
            />
            <TextInput
            style={styles.textInput} placeholder='First Name'
            onChangeText={ (first_name) => this.setState({first_name}) }
            underlineColorAndroid='transparent'
            />

            <TouchableOpacity
            style={styles.btn}
            onPress={this.registre}>
                <Text style={ styles.buttonText}>Register</Text>
            </TouchableOpacity>

            
            <Text style={styles.registreText}>Already Have account?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.registreButton}> Login</Text></TouchableOpacity>


          <Dialog.Container visible={this.state.errorEmpty}>
          <Dialogue description='"Email and Password are required"' title='Error Register'/>
          <Dialog.Button label="OK" onPress={this.handleCancel} />
        </Dialog.Container>


        </View>


        </KeyboardAvoidingView>
       
    );
  }
  
registre = () =>{
    fetch('http://192.168.0.14:6000/users/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    })
  })
  .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.succes === true){
       alert("Resgistred please Try To Login")
       this.props.navigation.navigate('Login')
      }
      else{
         alert("je suis la")
      }



    })
    .catch((error) => {
     this.showDialog()
    });
}


}


const styles = StyleSheet.create({
    wrapper:{
        flex : 1,
    },
    container:{
      backgroundColor:'#006DCD',
      flex: 1,
      alignItems:'center',
      justifyContent :'center'
    },

    textInput:{
      width:300,
      backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#ffffff',
      marginVertical: 10

    },
    btn:{
      width:300,
    backgroundColor:'#CC0000',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
    registreText: {
      color:'rgba(255,255,255,0.6)',
      fontSize:16
    },
    registreButton: {
      color:'#ffffff',
      fontSize:16,
      fontWeight:'500'
    },
    cont: {
      alignItems: 'center',
        flex:0.5,
       justifyContent: 'center',
       marginTop:270,
      },
});