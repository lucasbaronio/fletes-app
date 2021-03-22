import React from 'react';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { actions as orders } from "../index";
const { changeOriginAddressCoords } = orders;

const homePlace = {
    description: 'Casa',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
    description: 'Trabajo',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

function MapInput(){
        return (
            // <GooglePlacesAutocomplete
            //     placeholder='Search'
            //     onPress={(data, details = null) => {
            //         // 'details' is provided when fetchDetails = true
            //         console.log(data, details);
            //     }}
            //     query={{
            //         key: 'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk',
            //         language: 'en',
            //     }}
            //     enablePoweredByContainer={true}
            //     />

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                // @ts-ignore
                autoFocus={true}
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
                }}
                onFail={(error) => {
                    console.log(error)
                }}
                query={{
                    key: 'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk',
                    language: 'es',
                    components: 'country:uy',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                predefinedPlaces={[homePlace, workPlace]}
            />
        );
}
// export default MapInput;

function mapStateToProps(state, props) {
    return {
        // originAddressCoords: state.ordersReducer.originAddressCoords,
    }
}

export default connect(mapStateToProps, { changeOriginAddressCoords })(MapInput);
