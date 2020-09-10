//categorie soit systéme existant soit un utiliser ajouter une categorie et que l admin soit notifier 
//envoyer analyse et tous qui est a rajouter 
//diagramme classe user case 
//message interne et notification
//securité 

import Dialog from "react-native-dialog";
import React from 'react'
import { 
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Button,
     View, 
    Text } from 'react-native';

    export const Dialogue = (data) => {
        console.log(data)
        return <View>
           <Dialog.Title>{data.title}</Dialog.Title>
          <Dialog.Description>
           {data.description}
          </Dialog.Description>
        </View>
    }

