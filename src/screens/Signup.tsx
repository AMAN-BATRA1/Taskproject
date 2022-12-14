import React, { FC, useEffect, useState } from "react"
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import CommonButton from "../components/CommonButton";
import TextinputFunction from "../components/TextinputFunction";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUp = ({ navigation }: { navigation: any }) => {
  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [userName, SetName] = useState("")
  const [ChageColor, SetChageColor] = useState("")
  const Emailfunction = (text: string) => {
    SetEmail(text)
  }

  const Passwodfunction = (text: string) => {
    SetPassword(text)
  }

  const SetNamefunction = (text: string) => {
    SetName(text)
  }

  const storeandupdate_data = async (res: object) => {
    try {
      await AsyncStorage.setItem("user_data", JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }

  }

  const register = async () => {
    await auth().createUserWithEmailAndPassword(Email, Password)
      .then((res) => {
        if (res.additionalUserInfo) {
          storeandupdate_data(res)
          navigation.goBack()
          Alert.alert("User register Successfully")
        }
        console.log("res", res)
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        alert(error)
      });
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

            {/* <TextinputFunction
              placeholder={'Name'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={userName}
              onChangeText={(text: string) => SetNamefunction(text)}
            /> */}
            <TextInput
              style={{ backgroundColor: "white", color: "white", marginBottom: 10, width: "90%", borderWidth: 1, height: 45, paddingStart: 10, borderColor: ChageColor == "Name" ? "green" : "black", borderRadius: 3, color: "black" }}
              testID={"Name"}
              placeholder={'Name'}
              placeholderTextColor={'black'}
              value={userName}
              onFocus={() => { chnageColor("Name") }}
              onChangeText={(text: string) => SetNamefunction(text)}
            >
            </TextInput>
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
              onChangeText={(text: string) => Passwodfunction(text)}
            ></TextInput>

            {/* <TextinputFunction
              placeholder={'Password'}
              placeholderTextColor={'black'}
              islabel={true}
              keyboardTypenumber={false}
              value={Password}
              onChangeText={(text: string) => Passwodfunction(text)}
            /> */}

            <TouchableOpacity style={{ width: "80%", height: 45, backgroundColor: "#9DDDFF", borderRadius: 10, alignItems: "center", justifyContent: 'center', borderWidth: .5 }}
              testID={"Register"}
              onPress={() => { register() }}
            >
              <Text><Text style={{ fontWeight: "bold" }}>Register</Text></Text>
            </TouchableOpacity>
            {/* <CommonButton
              text="Register"
              style={{ width: '80%', marginTop: 10, }}
              onpress={() => {
                register()
              }}
            /> */}
            <TouchableOpacity style={{ height: "8%", width: "100%", alignItems: 'center', justifyContent: "center" }}
              onPress={() => navigation.navigate("Login")}
              testID="Nav.Login"
            >
              <Text style={{ fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default SignUp;
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