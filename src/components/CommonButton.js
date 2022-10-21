
import React, { FC, useLayoutEffect } from "react"
import { SafeAreaView, TouchableOpacity } from "react-native"
import { TextStyle, View, ViewStyle, StyleSheet, Text, Image } from "react-native"

const styles = StyleSheet.create({

})

const CommonButton = ({ ...props }) => {
    // const navigation = useNavigation()
    return (
        <TouchableOpacity {...props} style={[{
            // height:"8%",
            width: "90%",
            alignSelf: "center",
            // borderColor:"#D7EB4C",
            backgroundColor: "#D7EB4C",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            paddingVertical: 15,
            marginBottom: 10,
            borderWidth: .8,
        }, props.style]}
            onPress={props.onpress}>
            <Text style={[{ fontWeight: "bold", color: props.color ? props.color : "black" }, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}
export default CommonButton;