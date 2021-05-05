import { StyleSheet } from 'react-native';
import { color, fontSize, fontWeight } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white.white,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    gridView: {
      marginTop: 10,
      flex: .9,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      padding: 10,
      height: 150,
      shadowColor: color.black.black,
      borderRadius: 5,
      zIndex: 9,
      elevation: 7,
      shadowRadius: 3,
      shadowOpacity: .6,
      backgroundColor: color.white.white,
    },
    itemModel: {
      fontSize: fontSize.M,
      color: color.black.black,
      fontWeight: fontWeight.L,
    },
    itemRegistration: {
      fontWeight: fontWeight.L,
      fontSize: fontSize.S,
      color: color.black.black,
    },
    itemImage: {
      width: 150, 
      height: 90,
    }
});

export default styles;
