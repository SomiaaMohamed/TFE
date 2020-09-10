import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Button,
  View,
  Picker,
  Image,
  Text
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { ImagePicker, Permissions, Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  ActionSheetProvider,
  connectActionSheet,
  showActionSheetWithOptions,
} from '@expo/react-native-action-sheet';

@connectActionSheet

export default class Create extends React.Component {

  constructor(props) {
    super(props);
   // console.log(this.props)
    this.state = {
      id: '',
      name: '',
      token:'',
      lieu:'',
      image: null,
      language: '',
      categorie: '',
      cat: [],
      suggCat: [],
    }
  }

  componentDidMount() {
    this._loadInitState();
  }

  _loadInitState() {


    AsyncStorage.getItem('id')
      .then(res => {
        this.setState({
          id: res,
        })
      })
    AsyncStorage.getItem('token')
    .then(res => {
      this.setState({
        token:res
      })
      fetch('http://192.168.0.14:6000/categories/getAll', { headers: {
          'Authorization': 'Bearer '+res, 
   
        }})
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          this.setState({
            cat: responseJson

          })
          //console.log(this.state.cat)
        }
        else {
          alert('erreur')
        }
      })

    })
   

      AsyncStorage.getItem('email')
      .then(res => {
        console.log(this.state.token)
        fetch('http://192.168.0.14:6000/categories/getNonConfirmerByUser/'+res , { headers: {
          'Authorization': 'Bearer '+this.state.token, 
   
        }})
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson)
          this.setState({
            suggCat: responseJson

          })
          //console.log(this.state.cat)
        }
        else {
          alert('erreur')
        }
      })
      })





  }


  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };


  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });



    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };


  _takePic = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });



    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };



  _onOpenActionSheet = () => {
    const options = ['Galerie', 'Camera', 'Cancel'];
    const cancelButtonIndex = 2;
    cancelButtonIndex,

      this.props.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          if (buttonIndex == 0) {
            this._pickImage()
          }
          else if (buttonIndex == 1) {
            this._takePic()
          }
        },
      );
  };

  render() {
    let { image } = this.state;
    return (


      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>


        <View style={styles.container}>
          <Header
            leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Profile') }}
            centerComponent={{ text: 'NEW', style: { color: '#fff' } }}
            rightComponent={{ text: 'New Catégorie', style: { color: '#fff' }, onPress: () => this.props.navigation.navigate('Catégorie') }}
          />
          <View style={styles.view}>
            {image &&
              <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
              <Picker
              selectedValue={this.state.categorie}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ categorie: itemValue })
              }>
              <Picker.Item label='--Categorie sugg' value='' />
              {
                this.state.suggCat.map((c, i) => {

                  return (<Picker.Item key={i} label={c.name} value={c._id} />)

                })
              }
            </Picker>

            <Picker
              selectedValue={this.state.categorie}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ categorie: itemValue })
              }>
              <Picker.Item label='--Categorie Choice' value='' />
              {
                this.state.cat.map((c, i) => {

                  return (<Picker.Item key={i} label={c.name} value={c._id} />)

                })
              }
            </Picker>



            <TextInput
              style={styles.textInput} placeholder='Name'
              onChangeText={(name) => this.setState({ name })}
              underlineColorAndroid='transparent'
            />
             <TextInput
              style={styles.textInput} placeholder="Lieu D'enlévement"
              onChangeText={(lieu) => this.setState({ lieu })}
              underlineColorAndroid='transparent'
            />
            <Text>Upload Image</Text>
            <Icon style={styles.download} name='cloud-download' onPress={this._onOpenActionSheet} size={40} />

            <TouchableOpacity
              style={styles.btn}
              onPress={this.create}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>

          </View>
        </View>

      </KeyboardAvoidingView>

    );
  }

test = () => {
  console.log(this.state.categorie)
}


  create = () => {

    if (this.state.name  && this.state.categorie && this.state.image && this.state.lieu)  {




      let photo = { uri: this.state.image.uri }

      let formdata = new FormData();
      formdata.append("user", this.state.id)
      formdata.append("name", this.state.name)
      formdata.append("categorie", this.state.categorie)
      formdata.append("lieu", this.state.lieu)

      formdata.append("produitImage", { uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data' })




      fetch('http://192.168.0.14:6000/produits/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      })

        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.succes === true) {
            alert("Objet Added")
            this.props.navigation.navigate('Profile')
          }
          else {
            alert(responseJson.error)
          }



        })
        .catch((error) => {
          console.error(error);
        });


    }

    else {
      alert("Name ,Picture lieu and  Categorie are required")
    }


  }


}



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