import React, {Component } from 'react';
import { Button, TouchableOpacity, Image, AsyncStorage, View, Text, ScrollView, StyleSheet,Alert } from 'react-native';
//import console = require('console');
import { Header,Icon,Card } from 'react-native-elements';



export default class Reservation extends React.Component{

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
          id: '',
          produit: [],
    
        }
      }

      componentDidMount() {
        this._loadInitState().done();
      }

      _loadInitState = async () => {

        // if(this.props.navigation.state.params){
        //   if(this.props.navigation.state.params.newMessage){
    
        //     Alert.alert(
        //       'New Message',
        //       'you have new Message',
        //       [
        //         {text: 'OK', onPress: () => console.log('OK Pressed')},
        //       ],
        //       {cancelable: false},
        //     );
        //   }
    
        // }
    
    
        await AsyncStorage.getItem('id')
          .then(res => {
            this.setState({
              id: res,
            })
          })
    
    
        fetch('http://192.168.0.14:6000/reservations/getByUser/' + this.state.id)
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


      annulationReservation(r) {
      
      
              fetch('http://192.168.0.14:6000/reservations/'+r.idp,{
                method: 'DELETE',
              }
              )
              .then(res => {
                
                fetch('http://192.168.0.14:6000/produits/annulationRes/' + r.produit._id, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                })
                  .then(res => {
                    //alert(res.json)
                  })
                  .catch((error) => {
                    console.error(error);
                  });





              })
              .catch((error) => {
                console.error(error);
              });
          
      
      
      this.componentDidMount()
      
      
      }

      render() {
        console.log(this.state.produit)


        return (
    
          <ScrollView>
            <Header
              leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
              centerComponent={{ text: 'Panier', style: { color: '#fff' } }}
              rightComponent={{ icon: 'message', color: '#fff', onPress: () => this.props.navigation.navigate('Conversations') }}
            />
    
    
    {
          this.state.produit.length ? <Text></Text> :  <View style={styles.cont}>
            <Text>Panier Vide</Text>
            </View>
            }
    
    
            {
              this.state.produit.map((u, i) => {
                console.log(u.produit.reservation)
                return (
    
    
    
                  <Card key={i}
                    title={u.produit.name}>
                    <Image source={{ uri: 'http://192.168.0.14:6000/' + u.produit.produitImage }} style={{ width: 350, height: 250, resizeMode: 'contain', marginBottom: 30 }} />
                    <Button
                      icon={<Icon name='code' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                      title={u.produit.reservation ? 'Annuler Reservation' : 'Reserver'}
                      onPress={u.produit.reservation ? () => this.annulationReservation(u) : () => this.reserver(u._id)}
                    />
                  </Card>
    
    
    
    
    
    
                )
              })
            }
          </ScrollView>
        );
      }




      
}


const styles = StyleSheet.create({
  container: {
    flex:1,
   // alignItems: 'center',
    //justifyContent: 'center'
  },
  cont: {
    alignItems: 'center',
      flex:0.5,
     justifyContent: 'center',
     marginTop:270,
    },



});