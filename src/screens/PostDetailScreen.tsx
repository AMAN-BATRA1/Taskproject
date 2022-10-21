import React, { FC, useEffect, useState } from "react"
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import CommonButton from "../components/CommonButton";
import TextinputFunction from "../components/TextinputFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import axios from "axios";
import Header from "../common/Header";
import Card from "../common/Card";
import Loader from "../common/Loader";
const PostDatilScreen = (props: any) => {
    const [Field, setField] = useState("Comments")
    const [CommentData, setCommentdata] = useState("Comments")
    const [PhotoList, SetPhotoList] = useState([])
    const [LoaderView, SetLoaderView] = useState(false)

    // console.log("props", props)

    useFocusEffect(
        React.useCallback(() => {
            console.log("props", JSON.stringify(props.route.params.data.userId))
            LoadCommentData()
        }, [props])
    );

    useEffect(() => {
        getPhotos()
        // LoadCommentData()
    }, [])

    const getPhotos = () => {
        SetLoaderView(true)
        var config = {
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts/1/photos',
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    let data = response.data.filter((item) => item.albumId == props.route.params.data.userId)
                    SetPhotoList(data)
                    console.log(JSON.stringify(data));
                    setTimeout(() => {
                        SetLoaderView(false)
                    }, 1000);

                } else {
                    console.log("Something went wrong")
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const LoadCommentData = () => {
        let userid = props.route.params.data.userId
        console.log(userid)
        var config = {
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts/' + userid + '/comments',
        };
        console.log(config.url)
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setCommentdata(response.data)
                    // console.log(JSON.stringify(response.data));
                } else {
                    console.log("Something went wrong")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const renderitems = (data: any) => {
        return (
            <TouchableOpacity style={{ width: (Dimensions.get("window").width / 2) - 20, borderWidth: .5, borderColor: "black", alignItems: "center", backgroundColor: Field == data.item ? "#9DDDFF" : "white" }}
                onPress={() => { setField(data.item) }}
            >
                <Text style={{ padding: 6 }}>{data.item}</Text>
            </TouchableOpacity>
        )
    }

    const renderPhotosdata = (data: any) => {
        // console.log("commentdata", data)
        return (
            <View style={{ marginTop: 10 }}>
                <Image style={{ resizeMode: "contain", height: 100, width: Dimensions.get("window").width / 3 }} source={{ uri: data.item.url }}></Image>
            </View>
        )
    }

    const renderCommentitems = (data: any) => {
        // console.log("commentdata", data)
        return (
            <View style={styles.CommentView}>
                <Text style={styles.TextStyle}>From : {data?.item?.email}</Text>
                <Text><Text style={styles.TextStyle}>Name : </Text><Text>{data?.item?.name}</Text></Text>
                <Text style={{ textAlign: "left", }}><Text style={styles.TextStyle}>Comment : </Text>{data?.item?.body}</Text>
            </View>
        )
    }
    const FoterStyle = () => {
        return <View style={styles.Footer}></View>
    }
    return (
        <SafeAreaView style={styles.MainContainer}>
            {LoaderView ? <Loader></Loader> :
                <View style={styles.container}>
                    <Header title={"Post Detail"} back={true}
                        goBack={() => { props.navigation.goBack() }} />
                    <Card
                        disable={true}
                        numberOfLines={false}
                        propsdata={props.route.params.data}
                    ></Card>
                    <View style={styles.ButtonView}>
                        <FlatList contentContainerStyle={styles.FlatlistStyle}
                            // numColumns={2}
                            data={["Comments", "Photos"]}
                            renderItem={renderitems}
                            keyExtractor={(item, index) => index.toString()}
                        ></FlatList>
                    </View>
                    {Field == "Comments" ? <FlatList
                        data={CommentData}
                        // numColumns={1}
                        renderItem={renderCommentitems}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={FoterStyle}
                    ></FlatList> :
                        <View style={{ flexWrap: "wrap", flex: 1 }}>
                            <FlatList
                                numColumns={3}
                                data={PhotoList}
                                renderItem={renderPhotosdata}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={FoterStyle}
                            ></FlatList>
                        </View>
                    }
                </View>
            }
        </SafeAreaView>
    )
}
export default PostDatilScreen;
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
    },
    ButtonView: {
        width: "100%",
        backgroundColor: "grey",
        padding: 10
    },
    FlatlistStyle: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    Footer: {
        height: 50,
        width: "100%"
    },
    CommentView: {
        width: "98%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingStart: 10,
        marginTop: 5,
        paddingVertical: 10,
        borderWidth: .2,
        borderColor: "black",
        elevation: 10,
        shadowColor: "grey",
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.5
    },
    TextStyle: {
        fontWeight: "bold"
    }
})