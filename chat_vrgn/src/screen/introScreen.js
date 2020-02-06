import React,{
    useState,
    useEffect
  } from 'react';
  import {
    View,
    Text,
    TouchableOpacity
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  import { Auth } from 'aws-amplify';
  
  const introScreen = (props) => {

    const goPressed = () => {
      Auth.currentSession()
        .then(data => {
          console.log(data)
          Navigation.push(props.componentId, {
              component: {
                name: 'ChatScreen',
              }
          });
        })
        .catch(err => {
          console.log(err)
          Navigation.push(props.componentId, {
              component: {
                name: 'LoginScreen',
              }
          });
        });
    }

    const logoutPressed = () => {
      Auth.signOut()
        .then(success => {
          console.log(success)
        })
        .catch(err => {
          console.log(err)
        });
    }

    return (
      <View
        style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <TouchableOpacity
            style={{
                height: 40,
                width: '80%',
                backgroundColor: 'gray',
                borderWidth: 1,
                margin:'2.5%',
                paddingTop:5,
                alignItems:'center',
                justifyContent:'center'
            }}
            onPress={() => goPressed()}
        >
          <Text
            style={{fontSize:50, fontWeight:'bold'}}
          >
            Go
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                height: 40,
                width: '80%',
                backgroundColor: 'gray',
                borderWidth: 1,
                margin:'2.5%',
                paddingTop:5,
                alignItems:'center',
                justifyContent:'center'
            }}
            onPress={() => logoutPressed()}
        >
          <Text
            style={{fontSize:50, fontWeight:'bold'}}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default introScreen