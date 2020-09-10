import React, { Component } from 'react'
import { Button,KeyboardAvoidingView, TouchableOpacity, Image,TextInput, AsyncStorage,Alert, View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Header,Badge } from 'react-native-elements';


class Catégorie extends Component {

    state={
        name:'',
        cat:[],
    }


    create = () => {
        AsyncStorage.getItem('email')
        .then(res => {
            
            fetch('http://192.168.0.14:6000/categories/create',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user: res,
                  name:this.state.name,
                })
        
              })
              .then(resu => {
                  alert("categorie ajouter vous pouvez l'utiliser mais elle ne sera accecible en public qu'aprés confirmation de notre admin ")
                  this.props.navigation.navigate('Create')

              })
              .catch(err => {
                  console.log(err)
              })

        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.container}>
             <Header
                    centerComponent={{ text: 'New Catégorie', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Create') }}


                />
                 <View style={styles.view}>
                 <TextInput
              style={styles.textInput} placeholder='New Catégorie'
              onChangeText={(name) => this.setState({ name })}
              underlineColorAndroid='transparent'
            />
              <TouchableOpacity
              style={styles.btn}
              onPress={this.create}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

export default Catégorie

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      backgroundColor: '#fff',
      flex: 1,
    },
    download: {
      backgroundColor: '#fff',
      flex: 1,
    },
    pic: {
      backgroundColor: '#fff',
      flex: 1,
    },
  
  
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    textInput: {
  
      width: 300,
      //backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      marginVertical: 10,
      borderWidth: 4,
      height: 50
  
    },
    btn: {
      width: 300,
      backgroundColor: '#03A9F4',
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