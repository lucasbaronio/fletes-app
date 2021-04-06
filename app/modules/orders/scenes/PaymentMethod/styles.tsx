import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
    },
    button: {
      zIndex: 9,
      elevation: 7,
      position: 'absolute',
      flexDirection: 'row',
      width: '90%',
    },
});

export default styles;
