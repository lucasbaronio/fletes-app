import { StyleSheet } from 'react-native';
import { color, fontSize, fontWeight, screenSize } from '../../../../styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white.white,
      flexDirection: 'column',
      justifyContent: 'space-between',
      // alignItems: 'center'
    },
    gridView: {
      marginTop: 10,
      flex: .9,
    },
    itemContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
      maxWidth: (screenSize.width / 2) - 10,
      minHeight: 180,
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
      fontWeight: fontWeight.M,
    },
    itemRegistration: {
      fontWeight: fontWeight.M,
      fontSize: fontSize.S,
      color: color.grey.slateGrey,
    },
    itemImage: {
      width: 150, 
      height: 100,
      marginBottom: 5,
    }
});

export default styles;
