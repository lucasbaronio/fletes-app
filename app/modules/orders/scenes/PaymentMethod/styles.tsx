import { Dimensions, StyleSheet } from 'react-native';
import { color, fontSize, fontWeight, screenSize } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white.white,
      flexDirection: 'column',
    },
    containerButton: {
      zIndex: 9,
      elevation: 7,
      position: 'absolute',
      flexDirection: 'row',
      width: '90%',
      bottom: 20,
      left: (screenSize.width * 0.1) / 2,
    },
    rowContainer: {
      flex: 1, 
      justifyContent: "center", 
      flexDirection: 'row',
    },
    button: {
        paddingVertical: 10, 
        backgroundColor: color.primary.dark,
        borderRadius: 10,
    },
    textButton: {
      color: color.white.white, 
      fontSize: fontSize.L, 
      fontWeight: fontWeight.L, 
      textAlign: 'center'
    },
});

export default styles;
