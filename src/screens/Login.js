import * as React from 'react';
import {SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useState} from 'react';
import { save } from '../../storageFunctions';

import { UseGetUser } from '../componets/hooks/getUser';

const Login = ({navigation}) => {

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const {data, isLoading, refetch} = UseGetUser(username, password);

  if (data) {
    if (data.message === "Logged in!") {
      save("username", username);
      save("password", password);
      navigation.navigate("Splash");
    }
  
  }

  return (
    <SafeAreaView style = {styles.container}>
     
      <Image
        style={styles.logo}
        source={require('../assets/placeholderlogo.jpg')}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        //value={userName}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        //onSubmitEditing={onSubmit}

        keyboardType="numeric"
      />
      
      
      <TouchableOpacity
        style = {styles.button}
        onPress = {() => {
          refetch();
        }}
        
      >
        <Text style = {styles.buttonLabel}>
          Log in
        </Text>

      </TouchableOpacity>

      <View>
        {isLoading ? (
            <Text></Text>
        ): data ? (
            <Text>{data.message}</Text>
          
        ) : (
            <Text>Username or password incorrect</Text>
        )
        }
        </View>
      <View style = {styles.createAccount}>
       <TouchableOpacity>
          <Text style = {{color: 'white', fontSize: 12}}>Create an account</Text>
       </TouchableOpacity>
      </View>
 
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,

  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 12,
    width: 200,
    color: 'white'
    
  },
  logo: {
    margin: 75
  },
  createAccount: {
    margin: 12
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center'
  }

});

export default Login