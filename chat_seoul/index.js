import { Navigation } from "react-native-navigation";
import Amplify, { Auth } from 'aws-amplify';
// import App from "./App";

import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import { Rehydrated, graphqlMutation } from 'aws-appsync-react';
import { ApolloProvider, useApolloClient } from 'react-apollo';
import {ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import IntroScreen from "./src/screen/introScreen"
import LoginScreen from "./src/screen/loginScreen"
import SignupScreen from "./src/screen/signupScreen"
import ChatScreen from "./src/screen/chatScreen"

Navigation.registerComponent(`IntroScreen`, () => IntroScreen);
Navigation.registerComponent(`LoginScreen`, () => LoginScreen);
Navigation.registerComponent(`SignupScreen`, () => SignupScreen);
Navigation.registerComponent(`ChatScreen`, () => ChatScreen);

import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "IntroScreen"
            }
          }
        ]
      }
    }
  });
});