import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native"
import CommonButton from "../components/CommonButton";
import TextinputFunction from "../components/TextinputFunction";
import { useNavigation } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = (props: any) => {
  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [propsdata, setprops] = useState(props)

  const Emailfunction = (text: string) => {
    // console.log("props",props)
    SetEmail(text)
  }

  const Passwodfunction = (text: string) => {
    SetPassword(text)
  }

  const storeandupdate_data = async (res: object) => {
    try {
      await AsyncStorage.setItem("user_data", JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }

  }

  const sumitButton = () => {
    console.log("props", propsdata)
    if (!Email) {
      Alert.alert("Please enter email")
    } else if (!Password) {
      Alert.alert("Please enter password")
    } else {
      auth().signInWithEmailAndPassword(Email, Password)
        .then((res) => {
          if (res?.additionalUserInfo) {
            storeandupdate_data(res)
            console.log("Login res", res)
            propsdata.navigation.navigate("AppStack")
          }
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');

          }
          Alert.alert(error.code)
          console.error(error);
        });
    }
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView keyboardShouldPersistTaps={'never'} contentContainerStyle={styles.scrollViewStyle}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.Container}>
            <Text style={styles.TextStyle}>Demo App</Text>
            <TextinputFunction
              testID="EmailInput"
              placeholder={'Email'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={Email}
              onChangeText={(text: string) => Emailfunction(text)}
            />

            <TextinputFunction
              testID="PasswordInput"
              placeholder={'Password'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={Password}
              onChangeText={(text: string) => Passwodfunction(text)}
            />

            <CommonButton
              testID="LoginButton"
              text="Login"
              style={{ width: '80%', marginTop: 10, }}
              onpress={() => { sumitButton() }}
            />
            <TouchableOpacity style={{ height: "8%", width: "100%", alignItems: 'center', justifyContent: "center" }}
              onPress={() => { props.navigation.navigate("SignUp") }}
            >
              <Text>Don't have an account ? <Text style={{ fontWeight: "bold" }}>SIGN UP</Text></Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Login;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  Container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  TextStyle: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10
  },
  scrollViewStyle: {
    alignContent: 'center',
    flex: 1,
  }
})