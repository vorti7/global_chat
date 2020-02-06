import { Navigation } from "react-native-navigation";
import Amplify, { Auth } from 'aws-amplify';
import React, { PureComponent } from 'react';

import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import { Rehydrated, graphqlMutation } from 'aws-appsync-react';
import { ApolloProvider, useApolloClient } from 'react-apollo';
import {ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import IntroScreen from "./src/screen/introScreen"
import LoginScreen from "./src/screen/loginScreen"
import SignupScreen from "./src/screen/signupScreen"
import ChatScreen from "./src/screen/chatScreen"

Navigation.registerComponent(`IntroScreen`, () => WithProvider(IntroScreen));
Navigation.registerComponent(`LoginScreen`, () => WithProvider(LoginScreen));
Navigation.registerComponent(`SignupScreen`, () => WithProvider(SignupScreen));
Navigation.registerComponent(`ChatScreen`, () => WithProvider(ChatScreen));

import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
    
  }
})

const WithProvider = (Component) => {
  return class extends PureComponent{ 
    render () {
      return (
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <Rehydrated>
              <Component {...this.props} />
            </Rehydrated>
          </ApolloHooksProvider>
        </ApolloProvider>
      )
    }
  }
} 

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