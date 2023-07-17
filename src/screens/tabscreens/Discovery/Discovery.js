import { View, Text, StyleSheet,} from "react-native";
import { useState, useRef, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

import SchoolItems from "../../../componets/SchoolItems";


const Discovery = ({navigation}) => {

  //how state is set from secure storage to reduce server calls
  const [user, setUser] = useState('');
  const didMount = useRef(false);

  
  useEffect( () => {
      async function getValueFor(key) {
          let result = await SecureStore.getItemAsync(key);
          if (result) {
              didMount.current = true;
              setUser(JSON.parse(result));
          } else {
            console.log("none");
          }
        }

        getValueFor("user");
  }, [])
  
    return (
        <View style={StyleSheet.schoolItemsContainer}>
              <View>
            {user ? (
          <SchoolItems user = {user} navigation = {navigation}/>           
          
        ) : (
            <Text></Text>
        )
        }
        </View>
        </View>
      );
}

const styles = StyleSheet.create({
    schoolItemsContainer: {
        flex: 1,
    } 
})

export default Discovery