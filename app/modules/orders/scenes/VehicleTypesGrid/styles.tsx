import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      shadowColor: '#000000',
      borderRadius: 5,
      zIndex: 9,
      elevation: 7,
      shadowRadius: 3,
      shadowOpacity: .6,
    },
    itemName: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: 'black',
    },
});

export default styles;
