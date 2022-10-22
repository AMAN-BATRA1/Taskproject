import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TextInput, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native"
import CommonButton from "../components/CommonButton";
import TextinputFunction from "../components/TextinputFunction";
import { useNavigation } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }: { navigation: any }) => {
  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [ChageColor, SetChageColor] = useState("")

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
            navigation.navigate("AppStack")
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
  const chnageColor = (text: string) => {
    return SetChageColor(text)
  }
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView keyboardShouldPersistTaps={'never'} contentContainerStyle={styles.scrollViewStyle}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.Container}>
            <Text style={styles.TextStyle}>Demo App</Text>

            <TextInput
              style={{ backgroundColor: "white", color: "white", marginBottom: 10, width: "90%", borderWidth: 1, height: 45, paddingStart: 10, borderColor: ChageColor == "Email" ? "green" : "black", borderRadius: 3, color: "black" }}
              testID={"EmailInput"}
              placeholder={'Email'}
              placeholderTextColor={'black'}
              value={Email}
              onFocus={() => { chnageColor("Email") }}
              onChangeText={(text: string) => Emailfunction(text)}
            >
            </TextInput>
            {/* <TextinputFunction
              testID={"EmailInput"}
              placeholder={'Email'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={Email}
              onChangeText={(text: string) => Emailfunction(text)}
            /> */}

            <TextInput
              style={{ backgroundColor: "white", color: "white", marginBottom: 10, width: "90%", borderWidth: 1, height: 45, paddingStart: 10, borderColor: ChageColor == "Password" ? "green" : "black", borderRadius: 3, color: "black" }}
              testID={"PasswordInput"}
              placeholder={'Password'}
              placeholderTextColor={'black'}
              value={Password}
              onFocus={() => { chnageColor("Password") }}
              secureTextEntry={true}
              onChangeText={(text: string) => Passwodfunction(text)}
            ></TextInput>
            {/* <TextinputFunction
              testID={"PasswordInput"}
              placeholder={'Password'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={Password}
              onChangeText={(text: string) => Passwodfunction(text)}
            /> */}
            <TouchableOpacity style={{ width: "80%", height: 45, backgroundColor: "#9DDDFF", borderRadius: 10, alignItems: "center", justifyContent: 'center', borderWidth: .5 }}
              testID={"LoginButton"}
              onPress={() => { sumitButton() }}
            >
              <Text><Text style={{ fontWeight: "bold" }}>Login</Text></Text>
            </TouchableOpacity>
            {/* <CommonButton
              testID={"LoginButton"}
              text="Login"
              style={{ width: '80%', marginTop: 10, }}
              onpress={() => { sumitButton() }}
            /> */}
            <TouchableOpacity style={{ height: "8%", width: "100%", alignItems: 'center', justifyContent: "center" }}
              onPress={() => { navigation.navigate("SignUp") }}
              testID={"SignupNavigationButton"}
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
    marginBottom: 20
  },
  scrollViewStyle: {
    alignContent: 'center',
    flex: 1,
  }
})