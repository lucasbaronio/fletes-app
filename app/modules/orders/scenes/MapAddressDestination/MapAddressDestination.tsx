import React from 'react';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import { Text, Toast } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { MaterialIcons } from '@expo/vector-icons';

import { actions as orders } from "../../index";
const { setOrderDestinationAddress, getOrdersInfo } = orders;

import styles from './styles';
import SlidingPanelAddress from '../../components/SlidingPanelAddress';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { ERROR_EMPTY_STREET_NAME, ERROR_EMPTY_STREET_NUMBER } from '../../../../config/strings';
import { isNotEmpty } from '../../utils/validate';
import MapViewDirections from 'react-native-maps-directions';

type MyProps = {
    setOrderDestinationAddress: (data, onSuccess) => void,
    getOrdersInfo: (onSuccess, onError) => void,
    originAddress: {
        streetName: string,
        streetNumber: string,
        doorNumber: string,
        coords: {
            latitude: number,
            longitude: number,
        }
    },
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
    regionState: any,
    currentLocation: any,
}

class MapAddressDestination extends React.Component<MyProps, MyState> {
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
        const { coords } = this.props.originAddress;
        this.setState({ 
            regionState: {
                latitude: coords.latitude + 0.0030,
                longitude: coords.longitude + 0.0030,
                latitudeDelta: 0.010,
                longitudeDelta: 0.010,
            },
            isLoading: false
        })
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
            const { setOrderDestinationAddress, getOrdersInfo } = this.props;
            setOrderDestinationAddress({
                streetName: address.streetName,
                streetNumber: address.streetNumber,
                doorNumber: address.doorNumber,
                coords: {
                    latitude: regionState.latitude,
                    longitude: regionState.longitude,
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
        const { coords } = this.props.originAddress;
        const { regionState, isLoading } = this.state;
        
        return (
            <View style={styles.container}>
                <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        Por favor, mantén pulsado el marcador azul y arrastrelo hacia el lugar de destino del pedido
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
                    initialRegion={regionState}
                    showsCompass={true}
                    rotateEnabled={true}
                    showsUserLocation={true}
                    userLocationAnnotationTitle={'Mi ubicación'}
                    ref={(map) => {this.map = map}}
                    style={styles.mapStyle} >

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
                            pinColor="blue"
                            coordinate={regionState}
                            anchor={{ x: 0.35, y: 0.32}}
                            style={{ width: 10, height: 10 }} >
                            
                        </Marker>
                    }

                    <Marker 
                        // image={require('../../../../../assets/driver.png')}
                        pinColor="red"
                        coordinate={{
                            ...coords,
                            // latitudeDelta: 0.010,
                            // longitudeDelta: 0.010,
                        }}
                        anchor={{ x: 0.35, y: 0.32}}
                        style={{ width: 10, height: 10 }} >
                        
                    </Marker>

                    {
                        !isLoading &&
                        <MapViewDirections
                            origin={coords}
                            destination={regionState}
                            apikey={'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk'}
                            region='UY'
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
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
        originAddress: state.ordersReducer.createOrder.originAddress,
    }
}

export default connect(mapStateToProps, { setOrderDestinationAddress, getOrdersInfo })(MapAddressDestination);