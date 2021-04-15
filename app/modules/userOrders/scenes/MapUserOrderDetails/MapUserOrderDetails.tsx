import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity, SectionList } from 'react-native';
// import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
// import { StatusBar } from 'expo-status-bar';
import MapViewDirections from 'react-native-maps-directions';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod, createFinalOrder } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
import { showToast } from '../../../../components/Toast';
import { displayDate } from '../../utils/utils';

import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusText } from '../../../../config/utils';
import SlidingPanelOrderDetails from '../../components/SlidingPanelOrderDetails';

type MyProps = {
    acceptOrder: (orderId, onSuccess, onError) => void,
    order: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
}
class MapUserOrderDetails extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
        };
    }

    componentDidMount() {

    }

    onPressAccept = () => {
        const { navigation, acceptOrder, order } = this.props;
        // acceptOrder(order.orderId, this.onSuccess, this.onError);
        this.onSuccess();
    }

    onSuccess = () => {
        const { navigation } = this.props;
        // navigation.navigate('AcceptOrderWithDetails');
        alert('El pedido fue aceptado!!')
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
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

    render() {
        const { order, isLoading } = this.props;
        const { originAddress, destinationAddress, } = order;
        return (
            <SafeAreaView style={styles.container}>
                {/* <StatusBar style="dark" /> */}
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
                <SlidingPanelOrderDetails 
                    isLoading={isLoading}
                    order={order}
                    onPressAccept={this.onPressAccept} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.userOrdersReducer.isLoading,
        order: state.userOrdersReducer.orderSelected,
    }
}

export default connect(mapStateToProps, {  })(MapUserOrderDetails);
