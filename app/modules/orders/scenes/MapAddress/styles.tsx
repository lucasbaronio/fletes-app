import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { screenSize, color } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white.white,
      alignItems: 'center',
      justifyContent: 'center',
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
      elevation: 7,

      position: 'absolute',
      flexDirection: 'row',
      width: (screenSize.width-40),
      top: Constants.statusBarHeight + 50,
      left: 20,
      backgroundColor: color.translucent,
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
      elevation: 7,

      position: 'absolute',
      width: 45,
      height: 45,
      borderRadius: 50,
      left: screenSize.width-70,
      bottom: screenSize.height * 0.2,
      backgroundColor: color.translucent,
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 5,
      shadowOpacity: .6,
      justifyContent: 'space-around',
    },
});

export default styles;
