import React,{Component,useState,useEffect} from 'react'
import {Platform,SafeAreaView,View,TextInput,Text, StyleSheet} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import  Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

/*const Delivery = () =>{
    const [state,setState] = useState({
        location: null,
        errorMessage: null,
        loaded: false
      });

    useEffect(() => {
    locat()
  },{});
  const locat =  () =>{
    if (Platform.OS === 'android' && !Constants.isDevice) {
        setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          loaded:true
        });
      } else {
         _getLocationAsync();
      }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setState({
        errorMessage: 'Permission to access location was denied',
        loaded: true
      });
    } else {
      // only check the location if it has been granted
      // you also may want to wrap this in a try/catch as async functions can throw
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      setState({ location, loaded: true, errorMessage: null });
    }
  };

    // check to see if we have loaded
    if (state.loaded) {
      // if we have an error message show it
      if ( state.errorMessage) {
        return (
          <View style={styles.container}>
            <Text>{JSON.stringify(state.errorMessage)}</Text>
          </View>
        );
      } else if ( state.location) {
        // if we have a location show it
        return (
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: state.location.coords.latitude,
              longitude: state.location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          />
        );
      }
    } else {
      // if we haven't loaded show a waiting placeholder
      return (
        <View style={styles.container}>
          <Text>Waiting...</Text>
        </View>
      );
    }
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
export default Delivery; 
*/
/*export default class Home extends Component {
  state = {
    location: null,
    errorMessage: null,
    loaded: false
  };
  // componentWillMount has been deprecated, use componentDidMount instead
  componentDidMount () {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        loaded:true
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        loaded: true
      });
    } else {
      // only check the location if it has been granted
      // you also may want to wrap this in a try/catch as async functions can throw
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location, loaded: true, errorMessage: null });
    }
  };

  render () {
    // check to see if we have loaded
    if (this.state.loaded) {
      // if we have an error message show it
      if (this.state.errorMessage) {
        return (
          <View style={styles.container}>
            <Text>{JSON.stringify(this.state.errorMessage)}</Text>
          </View>
        );
      } else if (this.state.location) {
        // if we have a location show it
        return (
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          />
        );
      }
    } else {
      // if we haven't loaded show a waiting placeholder
      return (
        <View style={styles.container}>
          <Text>Waiting...</Text>
        </View>
      );
    }
  }
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
});*/
const Delivery = () =>{
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
    </View>
  );}
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
  export default Delivery; 
