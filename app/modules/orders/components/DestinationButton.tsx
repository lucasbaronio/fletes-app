import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

import { actions as orders } from "../index";
const { changeOriginAddressCoords } = orders;

const WIDTH = Dimensions.get('window').width;

const homePlace = {
    description: 'Casa',
    geometry: { location: { lat: -34.91944246970851, lng: -56.1515824697085 } },
};
const workPlace = {
    description: 'Trabajo',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export const DestinationButton = ({ navigation }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, { height: isFocused ? 200 : 20 }]}>
          <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                // @ts-ignore
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    const { lat, lng } = details.geometry.location;
                    changeOriginAddressCoords({
                        latitude: lat,
                        longitude: lng,
                    });
                    setIsFocused(false);
                }}
                onFail={(error) => {
                    console.log(error)
                }}
                keyboardShouldPersistTaps="handled"
                textInputProps={{
                  onFocus: () => {
                    setIsFocused(true);
                  },
                  onBlur: () => {
                    setIsFocused(false);
                  },
                }}
                query={{
                    key: 'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk',
                    language: 'es',
                    components: 'country:uy',
                }}
                GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                predefinedPlaces={[homePlace, workPlace]}
            />
        </View>
        // <TouchableOpacity 
        //     onPress={() => {
        //         navigation.navigate('AddressSearchBar');
        //     }}
        //     style={styles.container} >
        //         <View style={styles.leftCol}>
        //             <Text style={{ fontSize: 8 }}>
        //                 {'\u25A0'}
        //             </Text>
        //         </View>
        //         <View style={styles.centerCol}>
        //             <Text style={{ fontSize: 15, color: '#545454' }}>
        //                 Lugar de inicio para recoger sus productos
        //             </Text>
        //         </View>
        //         <View style={styles.rightCol}>
        //             <Ionicons name='md-car' color='#000000' size={25} style={{ alignSelf: 'center' }} />
        //         </View>
        // </TouchableOpacity>
    )
}

function mapStateToProps(state, props) {
  return {
      // originAddressCoords: state.ordersReducer.originAddressCoords,
  }
}

export default connect(() => {}, { changeOriginAddressCoords })(DestinationButton);



const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: (WIDTH-40),
    top: 90,
    left: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
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
