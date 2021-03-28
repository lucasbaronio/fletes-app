import { Dimensions, StyleSheet } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: WIDTH,
      height: HEIGHT,
      // height: 400,
    },
    slidingUpPanel: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    floatText: {
      zIndex: 9,
      elevation: 7,

      position: 'absolute',
      flexDirection: 'row',
      width: (WIDTH-40),
      top: 90,
      left: 20,
      borderRadius: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 10,
      shadowOpacity: .6,
      padding: 5,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
    floatButton: {
      zIndex: 9,
      elevation: 7,

      position: 'absolute',
      width: 45,
      height: 45,
      borderRadius: 50,
      left: WIDTH-70,
      bottom: HEIGHT * 0.2,
      // backgroundColor: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 5,
      shadowOpacity: .6,
      justifyContent: 'space-around',
    },
});

export default styles;
