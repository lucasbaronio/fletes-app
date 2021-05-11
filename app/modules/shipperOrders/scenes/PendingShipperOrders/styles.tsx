import { Dimensions, StyleSheet } from 'react-native';
import { color, fontWeight } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white.whitesmoke,
    },
    card: {
      flex: 1, 
      flexDirection: 'column', 
      margin: 10, 
      padding: 10, 
      backgroundColor: color.grey.slateGrey, 
      borderRadius: 5
    },
    containerMapView: {
      width: '100%', 
      height: 150
    },
    containerItemInfo: {
      flex: 1, 
      marginTop: 10
    },
    dateOrder: {
      fontWeight: fontWeight.L, 
      marginBottom: 5
    },
    statusOrder: {
      color: color.grey.lightGrey
    },
    floatText: {
      zIndex: 9,
      elevation: 7,

      position: 'absolute',
      flexDirection: 'row',
      right: 15,
      top: 15,
      backgroundColor: color.black.black,
      // opacity: 1,
      alignItems: 'center',
      // shadowColor: '#000000',
      
      shadowRadius: 10,
      shadowOpacity: .6,
      padding: 5,
      borderRadius: 10,
    },
});

export default styles;
