import React, { Component } from 'react'
import { Text, View, AsyncStorage, ScrollView, Container, Platform } from 'react-native'
import { GiftedChat ,Bubble } from 'react-native-gifted-chat'
import { Header } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';

// import console = require('console');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idConversation: '',
      messages: [],
      idUser: '',
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  componentDidMount() {
    this._loadInitState().done();
  }

  _loadInitState = async () => {
    var value = await AsyncStorage.getItem('id');

    if (this.props.navigation.state.params.id) {
      this.setState({
        idConversation: this.props.navigation.state.params.id,
        idUser: value,

      })
      let history = []

      var email = await AsyncStorage.getItem('email');
      console.log(email)

      fetch('http://192.168.0.14:6000/messages/getByConversation/' + this.props.navigation.state.params.id,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        })

      })
        .then((response) => response.json())
        .then((responseJson) => {
          for (let i = 0; i < responseJson.length; i++) {
            history.unshift(responseJson[i])
          }
          if (responseJson) {
            this.setState({
              messages: history
            })
          }
          else {
            alert('erreur')
          }
        })

    }
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    //console.log(this.state.idUser)

    // console.log(messages[0].createdAt)
    // console.log(messages[0].text)



    fetch('http://192.168.0.14:6000/messages/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.idUser,
        text: messages[0].text,
        conversation: this.state.idConversation
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.json)



      })
      .catch((error) => {
        console.log(error)
      });




  }

  render() {
    //console.log(this.state.messages)
    return (
      <View style={{ flex: 1 }}>

        <Header
          centerComponent={{ text: 'Message', style: { color: '#fff' } }}
          leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Conversations') }}


        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.idUser,
          }}
          renderBubble={this.renderBubble}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>


    )
  }
}

export default Messages