import * as React from 'react';
import {Component,useState,useEffect} from 'react'
import { View, Text, Button,StyleSheet } from 'react-native';
import  Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from "./Components/Register"
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
//import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
 import Login from './Components/Login';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Profile from './Components/UserProfile'
import Map from './Components/Map'
const RegisterStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
//const MapStack = createStackNavigator();
const Stack = createStackNavigator();
const RegisterStackScreen = ({navigation}) => (
  <RegisterStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <RegisterStack.Screen name="Register" component={RegisterScr} options={{
          title:'         RepairDukaan',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </RegisterStack.Navigator>
  );
  /*const MapStackScreen = ({navigation}) => (
    <MapStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <MapStack.Screen name="Map" component={Map} options={{
            title:'         RepairDukaan',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </MapStack.Navigator>
    );*/
  const LoginStackScreen = ({navigation}) => (
    <LoginStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <LoginStack.Screen name="Login" component={Login} options={{
            title:'           RepairDukaan',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </LoginStack.Navigator>
    );

    const ProfileStackScreen = ({navigation}) => (
      <ProfileStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#009387',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <ProfileStack.Screen name="UserProfile" component={Profile} options={{
              title:'           RepairDukaan',
              headerLeft: () => (
                  <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
              )
              }} />
      </ProfileStack.Navigator>
      );
function RegisterScr() {
  return (
    <RegisterScreen/>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Register">
       <Drawer.Screen name="Login" component={LoginStackScreen} />
       <Drawer.Screen name="Register" component={RegisterStackScreen} />
       <Drawer.Screen name="UserProfile" component={ProfileStackScreen}/>
    </Drawer.Navigator>
  );
}
/*<NavigationContainer >
      <Stack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: '#009387',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
       <Stack.Screen name="UserProfile" component={Profile}/>
       </Stack.Navigator>
    </NavigationContainer>*/

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  }
});
