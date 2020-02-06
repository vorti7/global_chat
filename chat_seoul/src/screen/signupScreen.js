import React,{
    useState,
    useEffect
  } from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  import { Auth } from 'aws-amplify';

  const signupScreen = (props) => {
    const [ idInput, setIdInput ] = useState("")
    const [ pwdInput, setPwdInput ] = useState("")

    const signupPressed = () => {
        Auth.signUp({
            username : idInput,
            password : pwdInput,
            attributes: {
                email : "mailforchat@korea.com"
            },
        })
        .then((data) => {
            console.log(data)
            Navigation.pop(props.componentId);
        })
        .catch(err => console.log(err));
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
            Sign Up
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
  
  export default signupScreen