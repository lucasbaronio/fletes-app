import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import { actions as orders } from "../../index";
const { setUserOrderSelected, getActiveOrdersUser } = orders;

import styles from './styles';
import { currentDate, displayDate, isLessThan, dateToFrontend } from '../../utils/utils';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusText, statusOrder } from '../../../../config/utils';
import CustomModal from '../../../../components/CustomModal';

type MyProps = {
    setUserOrderSelected: (order, successCB) => void,
    getActiveOrdersUser: (successCB, errorCB) => void,
    activeOrders: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
}
class ActiveUserOrders extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
        };
    }

    componentDidMount() {
        const { getActiveOrdersUser } = this.props; 
        getActiveOrdersUser(() => {}, this.onError);
    }

    onSelectOrderItem = (order) => {
        const { setUserOrderSelected } = this.props;
        setUserOrderSelected(order, this.onSuccess);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('MapUserOrderDetails');
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
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
            latitudeDelta: Math.abs(coordsA.latitude - midRegion.latitude) * 4,
            longitudeDelta: Math.abs(coordsA.longitude - midRegion.longitude),
        }
    }

    renderDate = (order) => {
        switch (order.status) {
          case statusOrder.PENDING:
            return displayDate(order.originAt);
          case statusOrder.ACCEPTED:
            return displayDate(order.originAt);
          case statusOrder.TO_ORIGIN:
            return order.shipperArrivesAtOriginAt 
                        ? displayDate(order.shipperArrivesAtOriginAt)
                        : displayDate(order.originAt);
          case statusOrder.AT_ORIGIN:
            return displayDate(order.shipperArrivedAtOriginAt);
          case statusOrder.TO_DESTINATION:
            return order.shipperArrivesAtDestinationAt 
                        ? displayDate(order.shipperArrivesAtDestinationAt)
                        : 'No se indicó hora estimada';
          case statusOrder.AT_DESTINATION:
            return displayDate(order.shipperArrivedAtDestinationAt);
          case statusOrder.COMPLETE_PENDING:
            return displayDate(order.shipperCompletedAt);
          default:
            return '';
        }
    }

    render() {
        const { error, visibleModal } = this.state;
        const { activeOrders, isLoading, getActiveOrdersUser } = this.props; 
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                <FlatList
                    ListEmptyComponent={
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                            <Text style={{ textAlign: 'center' }}>No se encontraron Pedidos Activos, desliza hacia abajo para actualizar</Text>
                        </View>
                    }
                    // ItemSeparatorComponent={() => <View style={{ flex: 1, marginHorizontal: 20, height: 1, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>}
                    data={activeOrders}
                    // keyExtractor={(item, index) => index.toString()}
                    keyExtractor={(item, index) => item.orderId.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={[color.black.black]}
                            tintColor={color.black.black}
                            refreshing={isLoading}
                            onRefresh={() => getActiveOrdersUser(() => {}, this.onError)}
                        />
                    }
                    renderItem={({ item }) => {
                        const { originAddress, destinationAddress } = item;
                        return (
                            <TouchableOpacity 
                                onPress={() => this.onSelectOrderItem(item)}
                                style={styles.card}>
                                {
                                    isLessThan(dateToFrontend(item.originAt), currentDate()) && statusOrder.PENDING == item.status &&
                                    <View style={styles.floatText}>
                                        <Text style={{ textAlign: 'center', color: color.red.redTomato }}>
                                            Vencida
                                        </Text>
                                    </View>
                                }
                                <MapView 
                                    showsMyLocationButton={false}
                                    showsPointsOfInterest={false}
                                    showsCompass={false}
                                    showsScale={false}
                                    showsBuildings={false}
                                    showsIndoors={false}
                                    zoomEnabled={false}
                                    zoomTapEnabled={false}
                                    zoomControlEnabled={false}
                                    rotateEnabled={false}
                                    scrollEnabled={false}
                                    pitchEnabled={false}
                                    toolbarEnabled={false}
                                    initialRegion={this.getMidPointCoords(originAddress.coords, destinationAddress.coords)}
                                    // ref={(map) => {this.map = map}}
                                    style={styles.containerMapView} >

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
                                <View style={styles.containerItemInfo}>
                                    <Text style={styles.dateOrder}>{this.renderDate(item)}</Text>
                                    <Text style={styles.statusOrder}>{getOrderStatusText(item.status)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        activeOrders: state.userOrdersReducer.activeOrders,
        isLoading: state.userOrdersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setUserOrderSelected, getActiveOrdersUser })(ActiveUserOrders);
