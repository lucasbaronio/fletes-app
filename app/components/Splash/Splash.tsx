import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Text } from 'react-native';

import { color, padding, fontSize } from "../../styles/theme";

class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={require('../../../assets/driver.png')}/>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white
    },

    wrapper:{
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center"
    },

    image:{
        width: 200,
        resizeMode: 'contain'
    },

    title: {
        fontSize:fontSize.large + 5,
        lineHeight:fontSize.large + 7,
        // fontFamily: fontFamily.medium,
        color: "#FF553F",
        letterSpacing: 1
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        height: 50
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});

export default Splash;