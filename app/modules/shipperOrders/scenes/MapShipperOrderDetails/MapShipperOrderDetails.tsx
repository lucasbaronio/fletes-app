import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { actions as shipperOrders } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = shipperOrders;
import { actions as users } from "../../../users/index";
const { getVehicles } = users;

import styles from './styles';
import { showToast } from '../../../../components/Toast';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusTextButtonShipper, getOrderStatusValue, statusOrder } from '../../../../config/utils';
import SlidingPanelAcceptOrder from '../../components/SlidingPanelAcceptOrder';

const GEOFENCING_ORIGIN = 'GEOFENCING_ORIGIN_TASK';
const GEOFENCING_DESTINATION = 'GEOFENCING_DESTINATION_TASK';

type MyProps = {
    changeOrderStatusAccepted: (orderStatusAccepted, onSuccess, onError) => void,
    changeOrderStatusToOrigin: (orderStatusToOrigin, onSuccess, onError) => void,
    changeOrderStatusAtOrigin: (orderId, onSuccess, onError) => void,
    changeOrderStatusToDestination: (orderStatusToDestination, onSuccess, onError) => void,
    changeOrderStatusAtDestination: (orderId, onSuccess, onError) => void,
    changeOrderStatusCompletePending: (orderId, onSuccess, onError) => void,
    getVehicles: (onSuccess, onError) => void,
    order: any,
    vehicles: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    textButton: string,
}
class MapShipperOrderDetails extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            textButton: '',
        };
    }

    componentDidMount() {
        const { order, getVehicles } = this.props;
        this.setState({
            textButton: getOrderStatusTextButtonShipper(order.status)
        });
        if (order.status == statusOrder.PENDING) {
            // getVehicles(this.onSuccess, this.onError);
        }
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

    onPress = () => {
        const { 
            order,
            changeOrderStatusAccepted,
            changeOrderStatusToOrigin,
            changeOrderStatusAtOrigin,
            changeOrderStatusToDestination,
            changeOrderStatusAtDestination,
            changeOrderStatusCompletePending,
        } = this.props;
        switch (order.status) {
            case statusOrder.CANCELED:
                // TODO
                return;
            case statusOrder.PENDING:
                changeOrderStatusAccepted({ 
                    order: order.orderId, 
                    vehicleId: 1
                }, this.onSuccess, this.onError);
            case statusOrder.ACCEPTED:
                changeOrderStatusToOrigin({ 
                    order: order.orderId, 
                    arrivesAt: '2021-04-04T12:00:00Z'
                }, this.onSuccess, this.onError);
            case statusOrder.TO_ORIGIN:
                changeOrderStatusAtOrigin(order.orderId, this.onSuccessCreateTasks, this.onError);
            case statusOrder.AT_ORIGIN:
                changeOrderStatusToDestination({ 
                    order: order.orderId, 
                    arrivesAt: '2021-04-04T12:00:00Z'
                }, this.onSuccess, this.onError);
            case statusOrder.TO_DESTINATION:
                changeOrderStatusAtDestination(order.orderId, this.onSuccess, this.onError);
            case statusOrder.AT_DESTINATION:
                changeOrderStatusCompletePending(order.orderId, this.onSuccess, this.onError);
            default:
                return;
        }
    }

    onSuccessCreateTasks = async (statusOrder) => {
        showToast('Estado del pedido: ' + getOrderStatusValue(statusOrder))
        const { orderId, originAddress, destinationAddress } = this.props.order;
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status === 'granted') {
            await Location.startGeofencingAsync(GEOFENCING_ORIGIN, [{
                identifier: orderId,
                latitude: originAddress.coords.latitude,
                longitude: originAddress.coords.longitude,
                radius: 20,
                notifyOnEnter: true,
                notifyOnExit: true,
            }]);
            await Location.startGeofencingAsync(GEOFENCING_DESTINATION, [{
                identifier: orderId,
                latitude: destinationAddress.coords.latitude,
                longitude: destinationAddress.coords.longitude,
                radius: 20,
                notifyOnEnter: true, // Solo enter porque no interesa cuando se va del destino
            }]);
        }
    }

    onSuccess = (status) => {
        showToast('Estado del pedido: ' + getOrderStatusValue(status))
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
    }

    render() {
        const { textButton } = this.state;
        const { order, vehicles, isLoading } = this.props;
        const { originAddress, destinationAddress, } = order;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" />
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
                    initialRegion={this.getMidPointCoords(originAddress.coords, destinationAddress.coords)}
                    style={styles.mapStyle} >

                    <Marker 
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
                        strokeColor={color.green.greenLima} />
                    
                </MapView>
                <SlidingPanelAcceptOrder 
                    isLoading={isLoading}
                    order={order}
                    vehicles={vehicles}
                    textButton={textButton}
                    onPress={this.onPress} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.shipperOrdersReducer.isLoading,
        order: state.shipperOrdersReducer.orderSelected,
        vehicles: state.usersReducer.vehicles,
    }
}

export default connect(mapStateToProps, {  })(MapShipperOrderDetails);
