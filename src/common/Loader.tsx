import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ActivityIndicator } from "react-native"
import { Images } from '../utils/Images';

const Loader = (props: any) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white", opacity: .5, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"small"} color={"black"}></ActivityIndicator>
            <Text>Please Wait ...</Text>
        </View>
    )
}
export default Loader;