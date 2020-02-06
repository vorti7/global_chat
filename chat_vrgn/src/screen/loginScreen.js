import React,{
    useState,
    useEffect
  } from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  import { Auth } from 'aws-amplify';
  
  const loginScreen = (props) => {
    const [ idInput, setIdInput ] = useState("")
    const [ pwdInput, setPwdInput ] = useState("")

    const loginPressed = () => {
        // console.log(idInput)
        // console.log(pwdInput)
        Auth.signIn(idInput, pwdInput)
        .then((user) => {
            console.log(user)
            Navigation.push(props.componentId, {
                component: {
                  name: 'ChatScreen',
                }
            });
        })
        .catch(err => console.log(err));
    }

    const signupPressed = () => {
        Navigation.push(props.componentId, {
            component: {
              name: 'SignupScreen',
            }
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
        <Text
            style={{fontSize:50, fontWeight:'bold'}}
        >
            Chat Example
        </Text>
        <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, margin:'2.5%' }}
            onChangeText={text => setIdInput(text)}
            value={idInput}
            placeholder="ID"
        />
        <TextInput
            style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, margin:'2.5%' }}
            onChangeText={text => setPwdInput(text)}
            value={pwdInput}
            placeholder="Password"
        />
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
            onPress={() => loginPressed()}
        >
            <Text
                style={{fontSize:30, color:'white'}}
            >
                Login
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
            onPress={() => signupPressed()}
        >
            <Text
                style={{fontSize:30, color:'white'}}
            >
                Signup
            </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default loginScreen