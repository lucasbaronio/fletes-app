import React from 'react';
import { connect } from 'react-redux';
import { Alert, SafeAreaView, View } from 'react-native';
import { Text, Toast } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { actions as orders } from "../../index";
const { setOrderOriginAddress, setOrderDestinationAddress, setOrderDate, getOrdersInfo } = orders;

import styles from './styles';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { 
    ERROR_EMPTY_STREET_NAME_ORIGIN, 
    ERROR_EMPTY_STREET_NUMBER_ORIGIN,
    ERROR_EMPTY_STREET_NAME_DESTINATION,
    ERROR_EMPTY_STREET_NUMBER_DESTINATION, 
    ORDERS_SCENES_MAP_ADDRESS_TITLE,
    ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION} from '../../../../config/strings';
import { isNotEmpty } from '../../utils/validate';
import MapViewDirections from 'react-native-maps-directions';
import SlidingPanelDateAddress from '../../components/SlidingPanelDateAddress';
import { dateToBackend } from '../../utils/utils';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { color, iconSize } from '../../../../styles/theme';

type MyProps = {
    setOrderOriginAddress: (data, onSuccess) => void,
    setOrderDestinationAddress: (data, onSuccess) => void,
    setOrderDate: (data, onSuccess) => void,
    getOrdersInfo: (onSuccess, onError) => void,
    isLoadingNext: boolean,
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
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert(ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION);
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

    onNextScreen = (address, date) => {
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
            const { setOrderOriginAddress, setOrderDestinationAddress, setOrderDate, getOrdersInfo } = this.props;
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
            setOrderDate(dateToBackend(date), () => {});
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
        const { isLoadingNext } = this.props;
        const { orderOriginAddress, orderDestinationAddress, isLoading } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        {ORDERS_SCENES_MAP_ADDRESS_TITLE}
                    </Text>
                </View>
                <View style={styles.mylocation}>
                    <MaterialIcons 
                        name='my-location'
                        color={color.black.black}
                        size={iconSize.L}
                        onPress={() => { this.centrateMap() }} />
                </View>
                <MapView 
                    // loadingEnabled={isLoading}
                    // loadingBackgroundColor="black"
                    // loadingIndicatorColor="white"
                    initialRegion={orderOriginAddress}
                    showsCompass={true}
                    rotateEnabled={true}
                    showsUserLocation={true}
                    showsTraffic={true}
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
                            pinColor={color.blue.steelBlue}
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
                            pinColor={color.red.redTomato}
                            coordinate={orderOriginAddress}
                            anchor={{ x: 0.35, y: 0.32}}
                            style={{ width: 10, height: 10 }} >
                            
                        </Marker>
                        <MapViewDirections
                            origin={orderOriginAddress}
                            destination={orderDestinationAddress}
                            apikey={API_KEY_GOOGLE}
                            // region='UY'
                            strokeWidth={3}
                            strokeColor={color.green.greenLima} />
                        </>
                    }
                    
                </MapView>
                <SlidingPanelDateAddress 
                    isLoading={isLoadingNext}
                    onNextScreen={this.onNextScreen}/>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        originAddress: state.ordersReducer.createOrder.originAddress,
        isLoadingNext: state.ordersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setOrderOriginAddress, setOrderDestinationAddress, setOrderDate, getOrdersInfo })(MapAddressDestination);
