import { Text, SafeAreaView, StyleSheet, View} from "react-native"
import React from "react"
import { FlatList } from "react-native"
import {UseGetUserItems}  from "./hooks/getUserItems"



function UserItems({user}) {

    const {data, isLoading} = UseGetUserItems(user);

    const Item = ({number, userID, time, title, description}: ItemProps) => (
        <View style={styles.item}>
          <Text style={styles.userID}>{userID}</Text>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      );
    return(
       
        <View>
        {isLoading ? (
            <Text>Loading</Text>
        ): data ? (
            <FlatList 
            data={data.data}
            renderItem={({item}) => <Item number={item.number} userID = {item.userID} time = {item.time} title = {item.title} description = {item.description}/>}
            keyExtractor={item => item.description}
          />
        ) : (
            <Text> No data avaliable</Text>
        )
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    item: {
        backgroundColor: 'yellow'
    }
})

export default UserItems;