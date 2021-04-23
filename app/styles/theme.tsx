import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

const color = {
    blue: {
        steelBlue: '#4682B4',
        midnightBlue: '#191970',
        lightBlue: '#ADD8E6',
        disable: '#9CAAD6',
    },
    grey: {
        lightGrey: '#D3D3D3',
        slateGrey: '#708090',
    },
    black: {
        black: "#3B3031",
        light_black: "#414141",
    },
    white: {
        white: "white",
        whitesmoke: 'whitesmoke',
    },
    red: {
        red: "red",
        redTomato: '#FF6347',
        disable: '#D69C9C',
    },
    green: {
        greenLima: '#32CD32',
    },
    transparent: "transparent",
    translucent: 'rgba(255, 255, 255, 0.5)',
}

const fontSize = {
    XXS: 8,
    XS: 12,
    S: 16,
    M: 18,
    L: 20,
    XL: 24,
    XXL: 30,
}

enum fontWeight {
    XS = '300',
    S = '400',
    M = '500',
    L = '600',
    XL = '700',
    XXL = '800',
}

const iconSize = {
    XS: 10,
    S: 15,
    M: 20,
    L: 25,
    XL: 30,
    XXL: 35,
    XXXL: 40,
}

// const fontFamily = {
//     extrabold: "RobotoExtraBold",
//     bold: "RobotoBold",
//     medium: "RobotoMedium",
//     regular: "RobotoRegular",
//     light: "RobotoLight"
// }

const isiOS = Platform.OS === 'ios';

const navbarHeight = isiOS ? 64 : 54;
const screenSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const isLargeScreen = screenSize.width >= 768;

const statusBarHeight = Constants.statusBarHeight;

// const tabColor = isiOS ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
// const selectedTabColor = isiOS ? "rgb(73,75,76)" : "#fff";
// const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
// const navTitleStyle = { 
//     fontSize: fontSize.M , 
//     // fontFamily: fontFamily.extrabold, 
//     color: color.black 
// }

export {
    isiOS,
    color,
    fontSize,
    fontWeight,
    iconSize,
    // fontFamily,
    screenSize,
    navbarHeight,
    statusBarHeight,
    isLargeScreen
}