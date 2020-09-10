import React, { Component } from 'react';
import { Button,Image, View,Text, ScrollView, StyleSheet,AsyncStorage } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import { Header,Icon,Card } from 'react-native-elements';
import { Dialogue } from '../components/Dialogue'
//import console = require('console');

export default class Produit extends React.Component {
    constructor(props){
        super(props);
       // this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            id: '',
            produit: '',
        }
    }

  componentDidMount(){
    this._loadInitState().done();
 }
 
 _loadInitState = async () => {
     
 if(this.props.navigation.state.params.id){
     this.setState({
       id:this.props.navigation.state.params.id
     })

     fetch('http://192.168.0.14:6000/produits/getOne/'+this.props.navigation.state.params.id)
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson){
       this.setState({
         produit:responseJson
       })
       }
       else{
         alert('erreur')
       }
     })




    }
 }

 contacter = () => {
   let idC:''
   //console.log(this.state.produit.user)
   AsyncStorage.getItem('id')
   .then(res => {
    fetch('http://192.168.0.14:6000/conversations/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user1: this.state.produit.user,
        user2: res,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
       // console.log(responseJson.con._id)
        this.props.navigation.navigate('Messages', { id: responseJson.con._id})



      })
      .catch((error) => {
        console.log(error)
      });
     
   })
 }

 reserver (r) {
  fetch('http://192.168.0.14:6000/produits/reserver/' + r, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      fetch('http://192.168.0.14:6000/produits/getOne/'+this.props.navigation.state.params.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson){
        this.setState({
          produit:responseJson
        })

        AsyncStorage.getItem('id')
        .then(res => {


          fetch('http://192.168.0.14:6000/reservations/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: res,
              produit: this.props.navigation.state.params.id,
            })
        })
        .then(res=> {
          console.log(res)
        })
        .catch((error) =>
        alert(error)
        )


        })
       // console.log(this.props.navigation.state.params.id)
        // AsyncStorage.getItem('id')
        // .then(res=> {
        //   fetch('http://192.168.0.14:6000/reservations/create', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       user: res,
        //       password: this.props.navigation.state.params.id,
        //     })
        // })
        // .then(res=> {
        //   console.log(res)
        // })

 
      }


        else{
          alert('erreur')
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

// reserver(r){
//   this.res(r).done();
//   this.componentDidMount()
// }


annulationReservation(r) {
  fetch('http://192.168.0.14:6000/produits/annulationRes/' + r, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      fetch('http://192.168.0.14:6000/produits/getOne/'+this.props.navigation.state.params.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson){
        this.setState({
          produit:responseJson
        })


        fetch('http://192.168.0.14:6000/reservations/'+this.props.navigation.state.params.id,{
          method: 'DELETE',
        }
        )
        .then(res => {
          console.log(res)
        })
        .catch((error) => {
          console.error(error);
        });
    






        }
        else{
          alert('erreur')
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });

  this.componentDidMount()
}


 test = () => {
   console.log(this.state.produit)
 }

  render() {
    let p=this.state.produit;

    return (
      <View>
           <Header
               leftComponent={{ icon: 'undo', color: '#fff',onPress: () => this.props.navigation.navigate('Home')}}
               centerComponent={{ text: 'Produit', style: { color: '#fff' }}}
/>

<Card
   style={styles.img}
  title={this.state.produit.name}>
  <Text style={{marginBottom: 10}}>
    { "lieu : " + this.state.produit.lieu }
  </Text>
  <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  title={p.reservation ? 'Annuler Reservation' : 'Reserver'}
                  onPress={this.state.produit.reservation ? () => this.annulationReservation(this.state.produit._id) : () => this.reserver(this.state.produit._id)}


                />
  
</Card>
<View style={styles.view}>
   <Image source={{ uri: 'http://192.168.0.14:6000/'+this.state.produit.produitImage }}  style={{width: 350, height: 350,resizeMode:'contain',marginBottom:30}}/>
   <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  title='Contact'

                  onPress={() => this.contacter()}


                />
   </View>
   

      </View>
    );
  }
}

const styles = StyleSheet.create({

    view:{
        alignItems:'center',
        justifyContent :'center',
        padding: 20,      
      },
      img:{
        flex:1,
        marginBottom:20,
     },

});

