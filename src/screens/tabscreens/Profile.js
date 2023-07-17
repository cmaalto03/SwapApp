import { View, Text} from "react-native";
import { useState, useRef, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

import UserItems from "../../componets/UserItems";


const Profile = () => {

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {user ? (
            <UserItems user = {user}/>           
          
        ) : (
            <Text></Text>
        )
        }
      
        </View>
      );
}

export default Profile