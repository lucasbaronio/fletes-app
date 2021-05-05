import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import { StatusBar } from 'expo-status-bar';
// import * as Location from 'expo-location';

import { actions as shipperOrders } from "../../index";
const { 
    changeOrderStatusAccepted,
    changeOrderStatusToOrigin,
    changeOrderStatusAtOrigin,
    changeOrderStatusToDestination,
    changeOrderStatusAtDestination,
    changeOrderStatusCompletePending,
    changeOrderStatusCanceled,
} = shipperOrders;
import { actions as users } from "../../../users/index";
const { getVehicles } = users;

import styles from './styles';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusSuccessText, getOrderStatusTextButtonShipper, statusOrder } from '../../../../config/utils';
import SlidingPanelShipperOrderDetails from '../../components/SlidingPanelShipperOrderDetails';
import CustomModal from '../../../../components/CustomModal';

// const GEOFENCING_ORIGIN = 'GEOFENCING_ORIGIN_TASK';
// const GEOFENCING_DESTINATION = 'GEOFENCING_DESTINATION_TASK';

type MyProps = {
    changeOrderStatusAccepted: (orderStatusAccepted, onSuccess, onError) => void,
    changeOrderStatusToOrigin: (orderStatusToOrigin, onSuccess, onError) => void,
    changeOrderStatusAtOrigin: (orderId, onSuccess, onError) => void,
    changeOrderStatusToDestination: (orderStatusToDestination, onSuccess, onError) => void,
    changeOrderStatusAtDestination: (orderId, onSuccess, onError) => void,
    changeOrderStatusCompletePending: (orderId, onSuccess, onError) => void,
    changeOrderStatusCanceled: (orderId, onSuccess, onError) => void,
    order: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
}
class MapShipperOrderDetails extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
        };
    }

    componentDidMount() {

    }

    getMidPointCoords = (coordsA, coordsB) => {
        let midRegion = {
            latitude: (coordsA.latitude + coordsB.latitude) / 2,
            longitude: (coordsA.longitude + coordsB.longitude) / 2,
            latitudeDelta: 0,
            longitudeDelta: 0
        };
        return {
            ...midRegion,
            latitudeDelta: Math.abs(coordsA.latitude - midRegion.latitude) * 5,
            longitudeDelta: Math.abs(coordsA.longitude - midRegion.longitude) * 3,
        }
    }

    initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    }

    onPress = (index) => {
        const { 
            order,
            changeOrderStatusAccepted,
            changeOrderStatusToOrigin,
            changeOrderStatusAtOrigin,
            changeOrderStatusToDestination,
            changeOrderStatusAtDestination,
            changeOrderStatusCompletePending,
            changeOrderStatusCanceled,
        } = this.props;
        switch (order.status) {
            case statusOrder.PENDING:
                const { vehicle } = order;
                if (vehicle && vehicle.vehicleId != 0) {
                    changeOrderStatusAccepted({ 
                        orderId: order.orderId, 
                        vehicle: {
                            vehicleId: order.vehicle.vehicleId,
                        }
                    }, this.onSuccess, this.onError);
                } else this.onError('Usted no ha seleccionado ningún vehiculo para realizar el pedido.');
                break;
            case statusOrder.ACCEPTED:
                if (index == 0) {
                    changeOrderStatusToOrigin({ 
                        orderId: order.orderId, 
                        arrivesAt: {
                            arrivesAt: "2021-05-12T18:20:00-03:00",
                        }
                    }, this.onSuccess, this.onError);
                } else {
                    changeOrderStatusCanceled(order.orderId, this.onSuccess, this.onError);
                }
                break;
            case statusOrder.TO_ORIGIN:
                changeOrderStatusAtOrigin(order.orderId, this.onSuccessCreateTasks, this.onError);
                break;
            case statusOrder.AT_ORIGIN:
                changeOrderStatusToDestination({ 
                    orderId: order.orderId, 
                    arrivesAt: {
                        arrivesAt: "2021-05-12T18:20:00-03:00",
                    }
                }, this.onSuccess, this.onError);
                break;
            case statusOrder.TO_DESTINATION:
                changeOrderStatusAtDestination(order.orderId, this.onSuccess, this.onError);
                break;
            case statusOrder.AT_DESTINATION:
                changeOrderStatusCompletePending(order.orderId, this.onSuccess, this.onError);
                break;
            default:
                return;
        }
    }

    onSuccessCreateTasks = async (statusOrder) => {
        this.onSuccess(statusOrder);
        // const { orderId, originAddress, destinationAddress } = this.props.order;
        // const { status } = await Location.requestBackgroundPermissionsAsync();
        // if (status === 'granted') {
        //     await Location.startGeofencingAsync(GEOFENCING_ORIGIN, [{
        //         identifier: orderId,
        //         latitude: originAddress.coords.latitude,
        //         longitude: originAddress.coords.longitude,
        //         radius: 20,
        //         notifyOnEnter: true,
        //         notifyOnExit: true,
        //     }]);
        //     await Location.startGeofencingAsync(GEOFENCING_DESTINATION, [{
        //         identifier: orderId,
        //         latitude: destinationAddress.coords.latitude,
        //         longitude: destinationAddress.coords.longitude,
        //         radius: 20,
        //         notifyOnEnter: true, // Solo enter porque no interesa cuando se va del destino
        //     }]);
        // }
    }

    onSuccess = (status) => {
        this.setState({
            error: getOrderStatusSuccessText(status), 
            visibleModal: true 
        });
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
    }

    render() {
        const { error, visibleModal } = this.state;
        const { order, isLoading } = this.props;
        const { originAddress, destinationAddress, status } = order;
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar style="dark" /> */}
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                {/* <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        {ORDERS_SCENES_MAP_ADDRESS_TITLE}
                    </Text>
                </View>
                <View style={styles.mylocation}>
                    <MaterialIcons 
                        name='my-location'
                        color={color.black.black}
                        size={iconSize.XL}
                        onPress={() => { this.centrateMap() }} />
                </View> */}
                <MapView 
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    showsScale={false}
                    showsBuildings={false}
                    showsIndoors={false}
                    // zoomEnabled={false}
                    // zoomTapEnabled={false}
                    // zoomControlEnabled={false}
                    rotateEnabled={false}
                    // scrollEnabled={false}
                    pitchEnabled={false}
                    toolbarEnabled={false}
                    initialRegion={!isLoading ? this.getMidPointCoords(originAddress.coords, destinationAddress.coords) : this.initialRegion}
                    style={styles.mapStyle} >
                    
                    {
                        // originAddress.coords && destinationAddress.coords &&
                        !isLoading &&
                        <><Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            pinColor={color.red.redTomato}
                            coordinate={originAddress.coords} >
                        </Marker>
                        <Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            pinColor={color.blue.steelBlue}
                            coordinate={destinationAddress.coords} >
                        </Marker>
                        <MapViewDirections
                            origin={originAddress.coords}
                            destination={destinationAddress.coords}
                            apikey={API_KEY_GOOGLE}
                            strokeWidth={3}
                            strokeColor={color.green.greenLima} /></>
                    }
                    
                </MapView>
                <SlidingPanelShipperOrderDetails 
                    isLoading={isLoading}
                    order={order}
                    vehicleSelected={order.vehicle}
                    textButton={getOrderStatusTextButtonShipper(status)}
                    onPress={this.onPress} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.shipperOrdersReducer.isLoading,
        order: state.shipperOrdersReducer.orderSelected,
        // vehicleSelected: state.shipperOrdersReducer.orderSelected.vehicle,
    }
}

export default connect(mapStateToProps, { 
    changeOrderStatusAccepted,
    changeOrderStatusToOrigin,
    changeOrderStatusAtOrigin,
    changeOrderStatusToDestination,
    changeOrderStatusAtDestination,
    changeOrderStatusCompletePending,
    changeOrderStatusCanceled,
})(MapShipperOrderDetails);
