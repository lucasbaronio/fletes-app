import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CurrentLocationButton = (props) => {
    const cb = props.cb ? props.cb : console.log('Callback function not passed')
    const bottom = props.bottom ? props.bottom : 65;

    return (
        <View style={[styles.container, {top: HEIGHT - bottom}]}>
            <MaterialIcons 
                name='my-location'
                color='#000000'
                size={25}
                onPress={() => { cb() }} />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 50,
    left: WIDTH-70,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
  },
  leftCol: {
    flex: 1,
    alignItems: 'center',
  },
  centerCol: {
    flex: 4,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
  },
});
