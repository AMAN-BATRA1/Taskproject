import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from "react-native"
import { Images } from '../utils/Images';

const Header = (props: any) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity style={{ width: "15%" }}
                onPress={() => { props.goBack() }}>
                {props.back ? <Image source={Images.Back} style={{ width: "55%", resizeMode: "contain", marginStart: 5 }}></Image> : null}
            </TouchableOpacity>
            <Text style={styles.TextStyles}>{props.title}</Text>
            <View style={{ width: "15%" }}></View>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    Container: {
        height: 45,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
        borderBottomWidth: .5,
        borderColor: "black",
        marginBottom: 10,
        flexDirection: "row"
    },
    TextStyles: {
        fontWeight: "bold",
        fontSize: 22,
        width: "70%", textAlign: "center",
    },
})

