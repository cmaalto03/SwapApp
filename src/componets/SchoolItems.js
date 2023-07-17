import { Text, SafeAreaView, StyleSheet, View} from "react-native"
import React from "react"
import { FlatList, Image, TouchableWithoutFeedback } from "react-native"
import {UseGetSchoolItems}  from "./hooks/getSchoolItems"



function SchoolItems({user, navigation}) {

    const {data, isLoading} = UseGetSchoolItems(user);

    const Item = ({username, time, title, description, image}: ItemProps) => (
        <TouchableWithoutFeedback  onPress={() => navigation.navigate("SchoolItem", {
            username: username,
            time: time,
            description: description,
            image: image,

        })}>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Image 
          style={styles.image}
          source={{uri:`${image}`}}
          />
          <View style = {styles.itemFooter}>
          
            <Image
        style={styles.logo}
        source={require('../assets/placeholder.jpg')}
            />
              <Image
        style={styles.logo}
        source={require('../assets/placeholder.jpg')}
            />
              <Image
        style={styles.logo}
        source={require('../assets/placeholder.jpg')}
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
   
      );
    return(
       <>
        
        <View>
        {isLoading ? (
            <Text>Loading</Text>
        ): data ? (
            <FlatList 
            data={data.data}
            renderItem={({item}) => <Item username = {item.username} time = {item.time} title = {item.title} description = {item.description} image = {item.image}/>}
            keyExtractor={item => item.itemNumber}
          />
        ) : (
            <Text> No data avaliable</Text>
        )
        }
        </View>
       </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    item: {
        flexDirection: 'column',

    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },

    title: {
        fontSize: 30,
        marginLeft: 20,
    },

    itemFooter: {
        flexDirection: "row",
        justifyContent: "center",
    },
    logo: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
    }
})

export default SchoolItems;