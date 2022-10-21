import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from "react-native"

const Card = (props: any) => {
    return (
        <TouchableOpacity disabled={props.disable} style={styles.maincon}
            onPress={() => { props.onpress() }}
        >
            <View style={styles.TitleView}>
                <Text numberOfLines={props.numberOfLines && 1} style={{ padding: 5 }}><Text style={{ fontWeight: "bold" }}>Title:-</Text> {props?.propsdata?.title}</Text>
            </View>
            <View style={styles.BodyView}>
                <Text numberOfLines={props.numberOfLines && 2} style={styles.BodyText}>{props?.propsdata?.body}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default Card;
const styles = StyleSheet.create({
    maincon: {
        width: Dimensions.get("window").width - 20,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 10,
        elevation: 10,
        shadowColor: "grey",
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.5
    },
    TitleView: {
        width: "100%",
        backgroundColor: "#9DDDFF"
    },
    BodyView: {
        backgroundColor: "white",
        width: "98%",
        alignSelf: "center"
    },
    BodyText: {
        padding: 5,
        paddingBottom: 10,
        textAlign: "justify"
    },
})