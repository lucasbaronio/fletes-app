import { Dimensions, StyleSheet } from 'react-native';
import { color, fontWeight, screenSize } from '../../../../styles/theme';

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
    mapStyle: {
      width: screenSize.width,
      height: screenSize.height * 0.6,
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
    }
});

export default styles;
