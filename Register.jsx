import React ,{ useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput,Text,Alert,View,Image,TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import Login from '../Components/Login';
//const Registerapi = axios.create({baseURL:'http://localhost:3000/signup/customer'});
export default function RegisterScreen({navigation}) {
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [number,setNumber] = useState(null);
  const [regsucc,setRegSucc] = useState(false);
  const [log,setlog] = useState(false);
  const onSubmitForm = async () => {
      try {
        const body = { fname, email, lname, password,number};
         await fetch( 
          "http://192.168.0.107:3000/signup/customer",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        ).then((response) => response.json())
        .then((responseJson) => {
       // console.log();
        if (responseJson.status === 'success') {
          console.log("Registration successful");
          setRegSucc(true);
        }
        else {
          return(
            Alert.alert(responseJson)
          )
        }
      })}
        // const parseRes = response;
        //console.log(response.json());
       /* if(parseRes){
            // setAuth(false);
            //toast.error(parseRes);
            console.log("Successful");
          }*/
       catch (err) {
        console.error(err.message);
      }
    };
    if(regsucc==true){
      return (
        <SafeAreaView
          style={styles.container}>
          <Image
            source={require('../assets/success.png')}
            style={{
              height: 200,
              width:200,
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
          />
          <Text style={styles.successTextStyle}>
            Registration Successful
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() =>{//setlog(true)
            navigation.navigate('Login')
            setRegSucc(false)}}>
            <Text style={styles.buttonTextStyle}>Login Now</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
    return(       
      <SafeAreaView style={styles.container}>
    <Text style= {styles.head}>Registration</Text>

         <TextInput
          style={styles.input}
          onChangeText={text=>setFname(text)}
          placeholder="First Name"
          name="fname"
          textAlign="center"
          placeholderTextColor="#B5B5B5"
         
        />
        <TextInput
          style={styles.input}
          onChangeText={text=>setLname(text)}
          placeholder="Last Name"
          name="lname"
          textAlign="center"
          placeholderTextColor="#B5B5B5"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text=>setEmail(text)}
          name="email"
          textAlign="center"
          placeholderTextColor="#B5B5B5"
        />
        <TextInput
          style={styles.input}
          onChangeText={text=>setNumber(text)}
          name="number"
          placeholder="+92-XXXXX-XXX"
          placeholderTextColor="#B5B5B5"
          keyboardType="numeric"
          textAlign="center"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text=>setPassword(text)}
          name="password"
          placeholderTextColor="#B5B5B5"
          textContentType="password"
          textAlign="center"
          secureTextEntry={true}
        />
      <View style={styles.btn}>
          <Button 
          type="outline"
            title="Register"
            onPress={onSubmitForm}
          />
        </View>
    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    head:{
      fontSize:40,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin:15
  
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 60,
      width:120,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 20,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'green',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
    btn:{
      textAlign: 'center',
      marginVertical: 15,
      width:250,
    },
    input: {
      height: 50,
      width:270,
      margin: 15,
      borderWidth: 3,
      fontSize:15
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    }
  );
  
  