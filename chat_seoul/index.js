import { Navigation } from "react-native-navigation";
import Amplify from 'aws-amplify';
// import App from "./App";
import LoginScreen from "./src/screen/loginScreen"
import SignupScreen from "./src/screen/signupScreen"
import ChatScreen from "./src/screen/chatScreen"

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
              name: "LoginScreen"
            }
          }
        ]
      }
    }
  });
});