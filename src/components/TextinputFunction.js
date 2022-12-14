import { Image, SafeAreaView, StyleSheet, Text, View, ViewStyle, TextInput } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
// import { TextInput } from 'react-native-paper';

const TextinputFunction = ({ ...props }) => {
    return <TextInput
        testID={props.testID}
        style={{ backgroundColor: "white", color: "white", marginBottom: 15, width: "90%", }}
        placeholder={props.placeholder}
        onChangeText={text => props.onChangeText(text)}
        secureTextEntry={props.secureTextEntry || false} />
    // <TextInput
    //     style={{ backgroundColor: "white", color: "white", marginBottom: 15, width: "90%", }}
    //     label={props.islabel ? props.placeholder : ""}
    //     placeholder={props.placeholder}
    //     placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : "white"}
    //     keyboardType={props.keyboardTypenumber ? "phone-pad" : "default"}
    //     activeUnderlineColor="#D7EB4C"
    //     secureTextEntry={props.isPassword ? true : false}
    //     // activeUnderlineColor="transparent"
    //     outlineColor="transparent"
    //     activeOutlineColor="#D7EB4C"
    //     value={props.value}
    //     onChangeText={text => props.onChangeText(text)}
    //     theme={{ colors: { text: 'black' } }}
    //     testID={props.testID}
    // />
}
export default TextinputFunction;