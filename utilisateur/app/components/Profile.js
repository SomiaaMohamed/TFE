import React, { Component } from 'react';
import { Button, TouchableOpacity, Image, AsyncStorage, View, Text, ScrollView, StyleSheet,Alert } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import { Header, Icon, Card } from 'react-native-elements';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      id: '',
      userEmail: '',
      produit: [],

    }
  }


  componentDidMount() {
    this._loadInitState().done();
  }

  _loadInitState = async () => {

    if(this.props.navigation.state.params){
      if(this.props.navigation.state.params.newMessage){

        Alert.alert(
          'New Message',
          'you have new Message',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }

    }


    

    AsyncStorage.getItem('email')
      .then(res => {
        this.setState({
          userEmail: res,
        })
      })

    await AsyncStorage.getItem('id')
      .then(res => {
        this.setState({
          id: res,
        })
      })


    fetch('http://192.168.0.14:6000/produits/getByUser/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            produit: responseJson
          })
        }
        else {
          alert('erreur')
        }
      })
  }

  test() {
    console.log("test 1 ")
  }

  // reserver(r) {
  //   fetch('http://192.168.0.14:6000/produits/reserver/' + r, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => {
  //       console.log("la"+res)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   this.componentDidMount()
  // }


  annulationReservation(r) {



    fetch('http://192.168.0.14:6000/reservations/'+r,{
      method: 'DELETE',
    }
    )
    .then(res => {
      
      fetch('http://192.168.0.14:6000/produits/annulationRes/' + r, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
         
          
          fetch('http://192.168.0.14:6000/produits/getByUser/' + this.state.id)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) {
              this.setState({
                produit: responseJson
              })
            }
            else {
              alert('erreur')
            }
          })



        })
        .catch((error) => {
          console.error(error);
        });





    })
    .catch((error) => {
      console.error(error);
    });

  }


  delete(r){
    fetch('http://192.168.0.14:6000/produits/'+r,{
      method: 'DELETE',
    }
    )
    .then(res => {


      fetch('http://192.168.0.14:6000/produits/getByUser/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            produit: responseJson
          })
        }
        else {
          alert('erreur')
        }
      })






    })
    .catch((error) => {
      console.error(error);
    });


  }

  confirmation(c){
    fetch('http://192.168.0.14:6000/reservations/confirmation/' + c , {
      method: 'POST'})
    .then(response => {
      this._loadInitState().done();
    })
  }

  render() {


    return (

      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'history', color: '#fff', onPress: () => this.props.navigation.navigate('Historique') }}
          centerComponent={{ text: this.state.userEmail, style: { color: '#fff' } }}
          rightComponent={{ icon: 'message', color: '#fff', onPress: () => this.props.navigation.navigate('Conversations') }}
        />
    



<ScrollView>
{
          this.state.produit.length ? <Text></Text> :  <View style={styles.cont}>
            <Text>No Post Yet</Text>
            </View>
            }

        {
          this.state.produit.map((u, i) => {
            return (



              <Card key={i}
                title={u.name}
                
                
                >
                <Icon
          raised
        name='check'
        color='#f50'
        disabled=  { ! u.reservation }
        containerStyle={Float="left"}
        onPress={() => this.confirmation(u._id)} 

  />
  
                <Image source={{ uri: 'http://192.168.0.14:6000/' + u.produitImage }} style={{ width: 350, height: 250, resizeMode: 'contain', marginBottom: 30 }} />
                <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title={u.reservation ? 'Annuler Reservation' : 'Delete'}
                  onPress={u.reservation ? () => this.annulationReservation(u._id) : () => this.delete(u._id)}
                />
                 
              </Card>






            )
          })
        }
        </ScrollView>
<View style={styles.icon}>

<Icon
          raised
        name='create'
        color='#f50'
  
        iconStyle={ position= 'absolute',right=0}
  onPress={() => this.props.navigation.navigate('Create')} 

  />
</View>
 
  
  
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  container: {
  //  alignItems: 'center',
    flex:1,
   // justifyContent: 'center'
  },
  icon: {
    position:"absolute",
    right:30,
    bottom:10,
  //    alignItems: 'flex-end',
  //  justifyContent: 'flex-end'
  },
  cont: {
    alignItems: 'center',
      flex:0.5,
     justifyContent: 'center',
     marginTop:270,
    },



});
