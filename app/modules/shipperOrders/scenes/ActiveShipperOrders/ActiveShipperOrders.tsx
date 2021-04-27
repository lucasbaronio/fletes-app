import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";

import { actions as shipperOrders } from "../../index";
const { setOrderSelected, getActiveOrdersShipper } = shipperOrders;

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
    setOrderSelected: (order, successCB) => void,
    getActiveOrdersShipper: (successCB, errorCB) => void,
    activeOrders: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
}
class ActiveShipperOrders extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
        };
    }

    async componentDidMount() {
        await this.requestPermissions();
        const { getActiveOrdersShipper } = this.props; 
        getActiveOrdersShipper(() => {}, this.onError);
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
        const { setOrderSelected } = this.props;
        setOrderSelected(order, this.onSuccess);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('ShipperPendingOrdersRoutes', { screen: 'MapShipperOrderDetails'});
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
        const { error, visibleModal } = this.state;
        const { isLoading, activeOrders, getActiveOrdersShipper } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                <FlatList
                    // ListFooterComponent={
                    //     <View style={{ flex: 1, marginVertical: 40 }}></View>
                    // }
                    // ItemSeparatorComponent={() => <View style={{ flex: 1, marginHorizontal: 20, height: 1, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>}
                    data={activeOrders}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={[color.black.black]}
                            tintColor={color.black.black}
                            refreshing={isLoading}
                            onRefresh={() => getActiveOrdersShipper(() => {}, this.onError)}
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
        activeOrders: state.shipperOrdersReducer.activeOrders,
        isLoading: state.shipperOrdersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setOrderSelected, getActiveOrdersShipper })(ActiveShipperOrders);
