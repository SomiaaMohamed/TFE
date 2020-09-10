import React, { Component } from 'react'
import { Button,KeyboardAvoidingView, TouchableOpacity, Image,TextInput, AsyncStorage,Alert, View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Header,Badge ,Card, ButtonGroup} from 'react-native-elements';
import Moment from 'moment'
class Historique extends Component{

    constructor () {
        super()
        this.state = {
          selectedIndex: 0,
          recu:[],
          donne: [],
          tab:[],
        }
        this.updateIndex = this.updateIndex.bind(this)
      }



      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        if(selectedIndex==0){
          this.setState({
            tab:this.state.recu,
          })
        }
        else if(selectedIndex==1){
         this.setState({
           tab:this.state.donne,
         })
        }
      }


      componentDidMount() {
        this._loadInitState().done();
    
      }

      _loadInitState = async () => {
        await AsyncStorage.getItem('email')
          .then(res => {
            fetch('http://192.168.0.14:6000/users/getOne/' +res)
            .then((response) => response.json())
               .then((responseJson) => {
                this.setState({
                  recu:responseJson.recu,
                  donne:responseJson.donne,
                  tab:responseJson.recu,
                })
               })



          })

      }


      
      
   
      
    render(){
      const buttons = ['Recu', 'Donné']
      const t=this.state.tab
      const { selectedIndex } = this.state
        return(

          t.length ? (

         
            <View style={styles.container}>
               <Header
            centerComponent={{ text: 'Historique', style: { color: '#fff' } }}
            leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Profile') }}


        />
               <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40}} />
  <ScrollView>

          {
            t.map((u,i) => {
              let da = u.created.replace('- - -', '/').substr(0, 10)
        let test = da.toLocaleString()
        let res = test.substr(0, 10)
              return (
                 

         

                <Card key={i}
                title={u.name + " ( " + Moment(res).format('DD MMM YYYY') + " ) " }
                style={styles.p}
                >
                <Image source={{ uri: 'http://192.168.0.14:6000/' + u.produitImage }} style={{ width: 350, height: 250, resizeMode: 'contain', marginBottom: 30 }} />
</Card>




              )
            })
          }

          </ScrollView>
            </View>
        )

        :
        (
          <View style={styles.container}>
             <Header
            centerComponent={{ text: 'Historique', style: { color: '#fff' } }}
            leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Profile') }}


        />
                <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40}} />
        <View style={styles.cont}>
            <Text>Vide</Text>
            </View>
          </View>
        )





        
        )
       


    }
}

export default Historique;

const styles = StyleSheet.create({
    container: {
       //alignItems: 'center',
        flex:1,
       //justifyContent: 'center',
       marginBottom:70,
      },
      cont: {
       alignItems: 'center',
         flex:0.9,
        justifyContent: 'center',
        marginTop:80,
       },

});