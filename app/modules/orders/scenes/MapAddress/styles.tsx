import { StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
import { screenSize, color, fontWeight, isiOS, navbarHeight } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // modal: {
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // modalText: {
    //   padding: 20,
    //   backgroundColor: color.translucent,
    //   borderColor: color.grey.lightGrey,
    //   borderRadius: 8,
    //   borderWidth: .3,
    //   shadowRadius: 10,
    //   shadowOpacity: .6,
    // },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 30,
      backgroundColor: color.white.whitesmoke,
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: color.black.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    activityIndicator: {
      padding: 10,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    mapStyle: {
      width: screenSize.width,
      height: screenSize.height,
    },
    slidingUpPanel: {
      flex: 1,
      backgroundColor: color.white.white,
      alignItems: 'center',
      justifyContent: 'center'
    },
    floatText: {
      zIndex: 9,
      elevation: 20,

      position: 'absolute',
      flexDirection: 'row',
      width: (screenSize.width-40),
      top: navbarHeight + 50,
      left: 20,
      backgroundColor: isiOS ? color.translucent : color.white.white,
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 10,
      shadowOpacity: .6,
      padding: 5,
      borderRadius: 10,
    },
    mylocation: {
      zIndex: 9,
      elevation: 20,

      position: 'absolute',
      width: 45,
      height: 45,
      borderRadius: 50,
      left: screenSize.width-70,
      bottom: screenSize.height * 0.2,
      backgroundColor: isiOS ? color.translucent : color.white.white,
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 5,
      shadowOpacity: .6,
      justifyContent: 'space-around',
    },
});

export default styles;
