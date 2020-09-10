import React, { Component } from 'react'
import { Button, TouchableOpacity, Image, AsyncStorage,Alert, View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Header,Badge } from 'react-native-elements';
import user  from '../images/user.png'

class Conversations extends Component {


    state = {
        emailUser: "",
        conversations: [],
        newConver:[],

        avatar_url:{"key": "Bone", "image": require("../images/user.png") }
    }


    componentDidMount() {
        this._loadInitState().done();
    }

    _loadInitState = async () => {

        var value = await AsyncStorage.getItem('email');
        fetch('http://192.168.0.14:6000/conversations/getConUser/' + value)
            .then((response) => response.json())
            .then((responseJson) => {

               for(let c of responseJson){
                   if(c.newMessage && c.lastSender!==value){

                    this.setState({
                        newConver: [... this.state.newConver,c],
                       })
                      

                       //if(c.user1.email==value){
                          // alert(c.user2.email + " send you a message")
                    //        this.setState({
                    //         newConver: [... this.state.newConver,c],
                    //        })
                    //    }
                    //    else  if(c.user2.email==value){
                    //    // alert(c.user1.email + " send you a message")
                    //     this.setState({
                    //         newConver: [... this.state.newConver,c],
                    //     })
                    // }
                   }
                   else{
                    this.setState({
                        conversations: [... this.state.conversations,c],
                        emailUser: value
                    }
                    )
                   }
               }
              

            }
            )

    }


    render() {
        let con = this.state.conversations.map(
            conv => {
                if (conv.user1.email == this.state.emailUser) {
                    return conv.user2
                }
                else {
                    return conv.user1
                }

            }
        )

        let newCon = this.state.newConver.map(
            conv => {
                if (conv.user1.email == this.state.emailUser) {
                    return conv.user2
                }
                else {
                    return conv.user1
                }

            }
        )



        return (
            <ScrollView style={styles.container}>
                <Header
                    centerComponent={{ text: 'Message', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'undo', color: '#fff', onPress: () => this.props.navigation.navigate('Profile') }}


                />
                <View >
                     {this.state.newConver ?

                        this.state.newConver.map((l, i) => (
                            <ListItem
                                 badge={{value: "new Message"}} 
                                key={l._id}
                                wrapperStyle={{flexDirection: 'row-reverse'}} 
                                title={newCon[i].name}
                                subtitle={newCon[i].email}
                               leftAvatar={{ source:  user}}
                                onPress={() => this.props.navigation.navigate('Messages', { id: l._id })}
                                 rightIcon={{ name: 'chevron-right' }}
                                //  leftAvatar={user}
                           
                            />

                        ))

                        : (<Text>...Loading</Text>)}
                        {
          this.state.conversations.length ? <Text></Text> :  <View style={styles.cont}>
            <Text>No Message Yet</Text>
            </View>
            }
                 {this.state.conversations ?

                        this.state.conversations.map((l, i) => (
                            <ListItem
                                key={l._id}
                                title={con[i].name}
                                subtitle={con[i].email}
                                leftAvatar={{ source:  user}}
                                //leftAvatar={{ user }}
                                onPress={() => this.props.navigation.navigate('Messages', { id: l._id })}
                                rightIcon={{ name: 'chevron-right' }}
                            />
                        ))

                        : (<Text>...Loading</Text>)}
                

                </View>
            </ScrollView>
        )
    }




}

export default Conversations
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
         marginTop:240,
        },

});