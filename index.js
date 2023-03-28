import { AppRegistry, StatusBar } from "react-native";
import { registerRootComponent,Logs } from 'expo';
import { register } from '@videosdk.live/react-native-sdk';
import App from './App';

//import { Logs } from 'expo'

Logs.enableExpoCliLogging()

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

register();

registerRootComponent(App);
//AppRegistry.registerComponent('main', () => App);
