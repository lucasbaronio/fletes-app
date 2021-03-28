import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Text, Toast } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
// import { DestinationButton } from '../../components/DestinationButton';
// import { CurrentLocationButton } from '../../components/CurrentLocationButton';
import { MaterialIcons } from '@expo/vector-icons';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { 
    ERROR_EMPTY_STREET_NAME, 
    ERROR_EMPTY_STREET_NUMBER
} from '../../../../config/strings';

import { actions as orders } from "../../index";
const { setOrderOriginAddress } = orders;

import styles from './styles';
import SlidingPanelAddress from '../../components/SlidingPanelAddress';
import { isNotEmpty } from '../../utils/validate';
// import { showToast } from '../../../../components/Toast';
// import { Toast } from 'native-base';

type MyProps = {
    setOrderOriginAddress: (data, onSuccess) => void,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
    regionState: any,
    currentLocation: any,
}

class MapAddressOrigin extends React.Component<MyProps, MyState> {
    map: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            regionState: null,
            currentLocation: null,
        };
    }

    async componentDidMount() {
        showToastLoading('Cargando mapa...');
        await this._getLocationAsync();
        Toast.hide();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert("Se necesita utilizar el mapa para poder utilizar la aplicación");
            console.log('El permiso de ubicacion fue denegado');
        }

        // let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
        let location = await Location.getCurrentPositionAsync()
        let currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
        }

        this.setState({ 
            regionState: currentLocation,
            currentLocation,
            isLoading: false
        })
    }

    centrateMap() {
        this.map.animateToRegion(this.state.currentLocation);
    }

    onNextScreen = (address) => {
        const val1 = isNotEmpty(address.streetName, () => {
            showToast(ERROR_EMPTY_STREET_NAME);
        });
        const val2 = isNotEmpty(address.streetNumber, () => {
            showToast(ERROR_EMPTY_STREET_NUMBER);
        });

        if (val1 && val2) {
            const { regionState } = this.state;
            const { navigation, setOrderOriginAddress } = this.props;
            setOrderOriginAddress({
                streetName: address.streetName,
                streetNumber: address.streetNumber,
                doorNumber: address.doorNumber,
                coords: {
                    latitude: regionState.latitude,
                    longitude: regionState.longitude,
                }
            }, () => navigation.push('MapAddressDestination'));
        }
        
    }

    render() {
        const { regionState, isLoading } = this.state;
        
        return (
            <View style={styles.container}>
                {/* <DestinationButton {...this.props}/> */}
                <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        Por favor, mantén pulsado el marcador rojo y arrastrelo hacia el lugar de recogida del pedido
                    </Text>
                </View>
                <View style={styles.floatButton}>
                    <MaterialIcons 
                        name='my-location'
                        color='#000000'
                        size={25}
                        onPress={() => { this.centrateMap() }} />
                </View>
                {/* <CurrentLocationButton cb={() => { this.centrateMap() }} /> */}
                <MapView 
                    // initialRegion={originAddressCoordsRegion}
                    initialRegion={regionState}
                    showsCompass={true}
                    // showsMyLocationButton={true}
                    showsUserLocation={true}
                    userLocationAnnotationTitle={'Mi ubicación'}
                    // followsUserLocation={true}
                    zoomEnabled={!isLoading}
                    zoomTapEnabled={!isLoading}
                    zoomControlEnabled={!isLoading}
                    rotateEnabled={!isLoading}
                    ref={(map) => {this.map = map}}
                    // cacheEnabled={true}
                    style={styles.mapStyle} >

                    {/* <Driver driver={{ uid: 'null', location: (originAddressCoords) ? originAddressCoords : regionState }} /> */}
                    {
                        !isLoading &&
                        <Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            onDragEnd = {(e) => {
                                this.setState({ regionState: {
                                    ...regionState,
                                    latitude: e.nativeEvent.coordinate.latitude,
                                    longitude: e.nativeEvent.coordinate.longitude,
                                } })
                            }}
                            pinColor="red"
                            coordinate={regionState}
                            anchor={{ x: 0.35, y: 0.32}}
                            style={{ width: 10, height: 10 }} >
                            
                        </Marker>
                    }
                    
                </MapView>
                <SlidingPanelAddress 
                    onNextScreen={this.onNextScreen}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        // originAddress: state.ordersReducer.createOrder.originAddress,
    }
}

export default connect(mapStateToProps, { setOrderOriginAddress })(MapAddressOrigin);
