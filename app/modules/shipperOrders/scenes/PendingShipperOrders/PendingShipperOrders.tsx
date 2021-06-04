import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";

import { actions as shipperOrders } from "../../index";
const { setShipperOrderSelected, getOrdersPendingShipper } = shipperOrders;

import styles from './styles';
import { currentDate, dateToFrontend, displayDate } from '../../utils/utils';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusText } from '../../../../config/utils';
import { ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION } from '../../../../config/strings';
import { isLessThan } from '../../../userOrders/utils/utils';
import CustomModal from '../../../../components/CustomModal';

type MyProps = {
    setShipperOrderSelected: (order, successCB) => void,
    getOrdersPendingShipper: (page, successCB, errorCB) => void,
    pendingOrders: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
    onEndReachedCalledDuringMomentum: boolean,
    page: number,
}
class PendingShipperOrders extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
            onEndReachedCalledDuringMomentum: false,
            page: 1,
        };
    }

    async componentDidMount() {
        const { getOrdersPendingShipper } = this.props; 
        const { page } = this.state;
        getOrdersPendingShipper(page, () => {}, this.onError);
        await this.requestPermissions();
    }

    requestPermissions = async () => {
        const foreground = await Location.requestForegroundPermissionsAsync();
        if (foreground.status !== 'granted') {
            alert(ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION);
            console.log('El permiso de ubicación (foreground) fue denegado');
            return;
        } else {
            const background = await Location.requestBackgroundPermissionsAsync();
            console.log(background);
            if (background.status !== 'granted') {
                alert(ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION);
                console.log('El permiso de ubicación (background) fue denegado');
                return;
            }
        }
        // else if (isiOS && (permissions.ios.scope !== 'always')) {
        //     alert(ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION_IOS);
        //     console.log('Permiso de uicación no es del tipo \'always\'');
        // }
        
    }

    onSelectOrderItem = (order) => {
        const { setShipperOrderSelected } = this.props;
        setShipperOrderSelected(order, this.onSuccess);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('MapShipperOrderDetails');
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

    render() {
        const { error, visibleModal, onEndReachedCalledDuringMomentum, page } = this.state;
        const { isLoading, pendingOrders, getOrdersPendingShipper } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                <FlatList
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum && page != 1) {
                            this.setState({
                                page: page + 1
                            }, () => getOrdersPendingShipper(page, () => {}, this.onError))
                            this.setState({ onEndReachedCalledDuringMomentum: true })
                        }
                    }}
                    onMomentumScrollBegin={() => this.setState({ onEndReachedCalledDuringMomentum: false })}
                    ListFooterComponent={() => {
                        if (isLoading && page != 1) {
                            return (
                                <View style={{ flex: 1, marginVertical: 20 }}>
                                    <ActivityIndicator size="small" />
                                </View>
                            )
                        } else return null
                    }}
                    ListEmptyComponent={
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                            <Text style={{ textAlign: 'center' }}>No se encontraron nuevos pedidos, desliza hacia abajo para actualizar</Text>
                        </View>
                    }
                    // ItemSeparatorComponent={() => <View style={{ flex: 1, marginHorizontal: 20, height: 1, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>}
                    data={pendingOrders}
                    keyExtractor={(item, index) => item.orderId.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={[color.black.black]}
                            tintColor={color.black.black}
                            refreshing={isLoading && page == 1}
                            onRefresh={() => {
                                this.setState({
                                    page: 1
                                }, () => getOrdersPendingShipper(page, () => {}, this.onError))
                            }}
                        />
                    }
                    renderItem={({ item }) => {
                        const { originAddress, destinationAddress } = item;
                        return (
                            <TouchableOpacity 
                            onPress={() => this.onSelectOrderItem(item)}
                                style={styles.card}>
                                {
                                    isLessThan(dateToFrontend(item.originAt), currentDate()) &&
                                    <View style={styles.floatTextView}>
                                        <Text style={styles.floatText}>
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
                                    <Text style={styles.dateOrder}>{displayDate(item.originAt)}</Text>
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
        pendingOrders: state.shipperOrdersReducer.pendingOrders,
        isLoading: state.shipperOrdersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setShipperOrderSelected, getOrdersPendingShipper })(PendingShipperOrders);
