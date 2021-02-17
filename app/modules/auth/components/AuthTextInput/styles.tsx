import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        width: windowWidth - 40,
        height: 65,
        fontSize: fontSize.regular + 2,
        // fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9"
    }
});

export default styles;