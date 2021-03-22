import React from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { DestinationButton } from './orders/components/DestinationButton';
import { CurrentLocationButton } from './orders/components/CurrentLocationButton';
import Driver from './orders/components/Driver';

class Map extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        region: null,
        errorMessage: null,
      };

      this._getLocationAsync();
    }

    // componentWillMount() {
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //       this.setState({
    //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //       });
    //     } else {
    //       this._getLocationAsync();
    //     }
    // }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('El permiso de ubicacion fue denegado');
        }

        // let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
        let location = await Location.getCurrentPositionAsync()
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
        }

        this.setState({region})
    }

    centrateMap() {
        // const {
        //     latitude,
        //     longitude,
        //     latitudeDelta,
        //     longitudeDelta
        // } = this.state.region;

        this.map.animateToRegion(this.state.region);
    }
  
    render() {
        return (
            <View style={styles.container}>
                <DestinationButton />
                <CurrentLocationButton cb={() => { this.centrateMap() }} />
                <MapView 
                    initialRegion={this.state.region}
                    showsCompass={false}
                    rotateEnabled={true}
                    // showsMyLocationButton={true}
                    showsUserLocation={true}
                    userLocationAnnotationTitle={'Mi ubicación'}
                    // followsUserLocation={true}
                    // loadingEnabled={true}
                    ref={(map) => {this.map = map}}
                    style={styles.mapStyle} >

                    <Driver driver={{uid: 'null', location: {
                        latitude: -34.91777630139643,
                        longitude: -56.151513880313374,
                    }}} />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default Map;
