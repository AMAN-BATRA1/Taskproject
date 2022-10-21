import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CommonButton from "../components/CommonButton";
import TextinputFunction from "../components/TextinputFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native"
import axios from "axios";
import Header from "../common/Header";
import Card from "../common/Card";
const HomeScreen = (props: any) => {
  const [propsdata, setprops] = useState(props)
  const [ListData, SetListData] = useState([])
  useEffect(() => {
    AsyncData()
    LoadPostData()
  }, [])

  const AsyncData = async () => {
    let data = await AsyncStorage.getItem("user_data");
    //   console.log("data",data)
  }

  const LoadPostData = async () => {
    var config = {
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
    };

    await axios(config)
      .then((response) => {
        SetListData(response.data)
        // console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert",
      "Are you sure you want to Logout",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Logout() }
      ]
    );

  const Logout = async () => {
    // console.log("props", propsdata)
    auth().signOut().then((res) => {
      clearAllData()
    }
      // console.log(res)
      // Alert.alert("Logout Successfully")
    );
  }

  const clearAllData = () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() =>
        propsdata.navigation.navigate("AuthStack"),
        alert('Logout success'));
  }

  const renderdata = (data: object) => {
    // console.log("hosakda",data.item)
    return (
      <Card
        numberOfLines={true}
        propsdata={data.item}
        onpress={() => { props.navigation.navigate("PostDatilScreen", { data: data.item }) }}
      ></Card>
    )
  }

  const FoterStyle = () => {
    return <View style={{ height: 50, width: "100%" }}></View>
  }
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.container}>
        <Header title={"Posts"} />
        <FlatList
          data={ListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderdata}
          ListFooterComponent={FoterStyle}
        ></FlatList>
        <CommonButton
          text="Logout"
          style={{ width: '80%', marginTop: 10, }}
          onpress={() => { createTwoButtonAlert() }}
        />
      </View>
    </SafeAreaView>
  )
}
export default HomeScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
})