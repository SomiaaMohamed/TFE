import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Picker,

  View, ScrollView
} from 'react-native';
import { Button, Icon, Header, Card, Text, Image } from 'react-native-elements'
import { StackNavigator, createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Create from './Create';
import SearchInput, { createFilter } from 'react-native-search-filter';


const KEYS_TO_FILTERS = ['categorie', 'subject'];
const KEYS_TO_FILTER = ['user', 'subject'];
const KEYS_TO_FIL = ['lieu', 'subject'];
export default class Home extends React.Component {

  constructor(props) {
    super(props),
     // this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      produits: [],
      loading: true,
      id: '',
      sarchCat: '',
      sarchUser: '',
      sarchLieu:'',
      cat: [],
      users: [],
    }
  }

  componentDidMount() {
    this._loadInitState().done();

  }

  _loadInitState = async () => {
    await AsyncStorage.getItem('id')
      .then(res => {
        this.setState({
          id: res
        })
      })
    fetch('http://192.168.0.14:6000/produits/getAllT/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            loading: false,
            produits: responseJson

          })
        //  console.log(this.state.produits)
        }
        else {
          alert('erreur')
        }
      })
       AsyncStorage.getItem("token")
      .then(res => {
        fetch('http://192.168.0.14:6000/categories/getAll', { headers: {
          'Authorization': 'Bearer '+res, 
   
        }})
    
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson) {
            this.setState({
              cat: responseJson
  
            })
           // console.log(this.state.cat)
          }
          else {
            alert('erreur')
          }
        })
      })
      
  

      fetch('http://192.168.0.14:6000/users/getAll')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            users: responseJson

          })
         // console.log(this.state.cat)
        }
        else {
          alert('erreur')
        }
      })



  }





  test() {
    // AsyncStorage.removeItem('token'),
    this.props.navigation.navigate('Login')
    //const { navigate } = this.props.navigation;
    //navigate.navigate('Login')
    //return Profile

    console.log('teeest')

  }


  searchUpdated(term) {
    this.setState({ sarchCat: term })
  }

  searchUpdat(term) {
    this.setState({ sarchUser: term })
  }

  searchUp(term) {
    this.setState({ sarchLieu: term })
  }



  render() {
    const filteredProduits = this.state.produits.filter(createFilter(this.state.sarchCat, KEYS_TO_FILTERS))
    const filtered = filteredProduits.filter(createFilter(this.state.sarchLieu, KEYS_TO_FIL))
    return (

      <ScrollView style={styles.container}>
        <Header
          centerComponent={{ text: 'Acceuil', style: { color: '#fff' } }}
          leftComponent={{ icon: 'input', color: '#fff', onPress: () => this.props.navigation.navigate('Login') }}
          rightComponent={{ icon: 'business-center', color: '#fff', onPress: () => this.props.navigation.navigate('Reservation') }}


        />
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>

<SearchInput 
          onChangeText={(term) => { this.searchUp(term) }} 
          style={styles.searchInput}
          placeholder="Lieu"
          />

          <Picker
            selectedValue={this.state.sarchCat}
            style={{ height: 50, width: 200, color: 'black' }}
            onValueChange={(itemValue, itemIndex) => {
              this.searchUpdated(itemValue),
                this.setState({ sarchCat: itemValue })
            }
            }>
            <Picker.Item label='All' value='' />
            {
              this.state.cat.map((c, i) => {

                return (<Picker.Item key={i} label={c.name} value={c._id} />)

              })
            }
          </Picker>



        </View>
        {this.state.loading ? <View style={styles.view}><Text style={styles.txt}>loading...</Text></View> : <Text></Text>}
        {
          filtered.length ? <Text></Text> :  <View style={styles.cont}>
            <Text>No Product Yet</Text>
            </View>
            }

        {
          
          filtered.map((u, i) => {

            return (

              <Card key={i}

                title={u.name +" ( "+u.lieu + " )"}
                text={u.lieu}
                style={styles.img}
              >


                <Image source={{ uri: 'http://192.168.0.14:6000/' + u.produitImage }} style={{ width: 350, height: 250, resizeMode: 'contain', marginBottom: 30 }} />

                <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  title='VIEW NOW'

                  onPress={() => this.props.navigation.navigate('Produit', { id: u._id })}


                />
              </Card>



            );
          })

        }


      </ScrollView>

    );

  }
}

const styles = StyleSheet.create({
  icon: {
    // position: 'absolute',

    left: 0,
  },
  container: {
    flex: 1
  },
  img: {
    flex: 1
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  txt: {
    fontSize: 20,
    color: 'black',


  },
  cont: {
    alignItems: 'center',
      flex:0.7,
     justifyContent: 'center',
     marginTop:160,
    },

});

