import React from 'react';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import { Text, Toast } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from '@expo/vector-icons';

import { actions as orders } from "../../index";
const { setOrderOriginAddress, setOrderDestinationAddress, getOrdersInfo } = orders;

import styles from './styles';
import SlidingPanelAddress from '../../components/SlidingPanelAddress';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { 
    ERROR_EMPTY_STREET_NAME_ORIGIN, 
    ERROR_EMPTY_STREET_NUMBER_ORIGIN,
    ERROR_EMPTY_STREET_NAME_DESTINATION,
    ERROR_EMPTY_STREET_NUMBER_DESTINATION } from '../../../../config/strings';
import { isNotEmpty } from '../../utils/validate';
import MapViewDirections from 'react-native-maps-directions';
import SlidingPanelDateAddress from '../../components/SlidingPanelDateAddress';

type MyProps = {
    setOrderOriginAddress: (data, onSuccess) => void,
    setOrderDestinationAddress: (data, onSuccess) => void,
    getOrdersInfo: (onSuccess, onError) => void,
    // originAddress: {
    //     streetName: string,
    //     streetNumber: string,
    //     doorNumber: string,
    //     coords: {
    //         latitude: number,
    //         longitude: number,
    //     }
    // },
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
    orderOriginAddress: any,
    orderDestinationAddress: any,
    currentLocation: any,
}

class MapAddressDestination extends React.Component<MyProps, MyState> {
    map: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            orderOriginAddress: null,
            orderDestinationAddress: null,
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

        let location = await Location.getCurrentPositionAsync()
        let currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
        }

        this.setState({ 
            currentLocation,
            orderOriginAddress: currentLocation,
            orderDestinationAddress: {
                ...currentLocation,
                latitude: currentLocation.latitude + 0.0030,
                longitude: currentLocation.longitude + 0.0030,
            },
            isLoading: false
        })
    }

    centrateMap() {
        this.map.animateToRegion(this.state.currentLocation);
    }

    onNextScreen = (address) => {
        const val1 = isNotEmpty(address.originAddress.streetName, () => {
            showToast(ERROR_EMPTY_STREET_NAME_ORIGIN);
        });
        const val2 = isNotEmpty(address.originAddress.streetNumber, () => {
            showToast(ERROR_EMPTY_STREET_NUMBER_ORIGIN);
        });
        const val3 = isNotEmpty(address.destinationAddress.streetName, () => {
            showToast(ERROR_EMPTY_STREET_NAME_DESTINATION);
        });
        const val4 = isNotEmpty(address.destinationAddress.streetNumber, () => {
            showToast(ERROR_EMPTY_STREET_NUMBER_DESTINATION);
        });
        
        if (val1 && val2 && val3 && val4) {
            const { orderOriginAddress, orderDestinationAddress } = this.state;
            const { setOrderOriginAddress, setOrderDestinationAddress, getOrdersInfo } = this.props;
            setOrderOriginAddress({
                ...address.originAddress,
                coords: {
                    latitude: orderOriginAddress.latitude,
                    longitude: orderOriginAddress.longitude,
                }
            }, () => {});
            setOrderDestinationAddress({
                ...address.destinationAddress,
                coords: {
                    latitude: orderDestinationAddress.latitude,
                    longitude: orderDestinationAddress.longitude,
                }
            }, () => {});
            getOrdersInfo(this.onSuccess, this.onError); 
        }
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.push('VehicleTypesGrid');
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
    }

    render() {
        const { orderOriginAddress, orderDestinationAddress, isLoading } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        Por favor, arrastre los marcadores segun el lugar de inicio (Rojo) y destino (azul) del pedido.
                    </Text>
                </View>
                <View style={styles.floatButton}>
                    <MaterialIcons 
                        name='my-location'
                        color='#000000'
                        size={25}
                        onPress={() => { this.centrateMap() }} />
                </View>
                <MapView 
                    initialRegion={orderOriginAddress}
                    showsCompass={true}
                    rotateEnabled={true}
                    showsUserLocation={true}
                    userLocationAnnotationTitle={'Mi ubicación'}
                    ref={(map) => {this.map = map}}
                    style={styles.mapStyle} >

                    {
                        !isLoading &&
                        <><Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            onDragEnd = {(e) => {
                                this.setState({ orderDestinationAddress: {
                                    ...orderDestinationAddress,
                                    latitude: e.nativeEvent.coordinate.latitude,
                                    longitude: e.nativeEvent.coordinate.longitude,
                                } })
                            }}
                            pinColor="blue"
                            coordinate={orderDestinationAddress}
                            anchor={{ x: 0.35, y: 0.32}}
                            style={{ width: 10, height: 10 }} >
                            
                        </Marker>

                    <Marker 
                        draggable
                        // image={require('../../../../../assets/driver.png')}
                        onDragEnd = {(e) => {
                            this.setState({ orderOriginAddress: {
                                ...orderOriginAddress,
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                            } })
                        }}
                        pinColor="red"
                        coordinate={orderOriginAddress}
                        anchor={{ x: 0.35, y: 0.32}}
                        style={{ width: 10, height: 10 }} >
                        
                    </Marker>
                        <MapViewDirections
                            origin={orderOriginAddress}
                            destination={orderDestinationAddress}
                            apikey={'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk'}
                            region='UY'
                            strokeWidth={3}
                            strokeColor="hotpink"
                        /></>
                    }
                    
                </MapView>
                {/* <SlidingPanelAddress 
                    onNextScreen={this.onNextScreen}/> */}
                <SlidingPanelDateAddress 
                    onNextScreen={this.onNextScreen}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        originAddress: state.ordersReducer.createOrder.originAddress,
    }
}

export default connect(mapStateToProps, { setOrderOriginAddress, setOrderDestinationAddress, getOrdersInfo })(MapAddressDestination);
