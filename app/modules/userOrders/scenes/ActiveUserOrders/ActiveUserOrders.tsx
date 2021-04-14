import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import { actions as orders } from "../../index";
const { setOrderSelected } = orders;

import styles from './styles';
import { showToast } from '../../../../components/Toast';
import { currentDate, displayDate } from '../../utils/utils';
import MapViewDirections from 'react-native-maps-directions';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusText } from '../../../../config/utils';

type MyProps = {
    setOrderSelected: (order, successCB) => void,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
    data: any,
}
class ActiveUserOrders extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            data: [],
        };
    }

    componentDidMount() {
        this.setState({
            data: [
                {
                    orderId: 1,
                    originAt: currentDate(),
                    status: 'PENDING',
                    originAddress: {
                        addressId: 10,
                        streetName: 'Vazquez Ledesma',
                        streetNumber: '2983',
                        doorNumber: '2D',
                        coords: {
                            latitude: -34.920704,
                            longitude: -56.152935,
                        }
                    },
                    destinationAddress: {
                        addressId: 10,
                        streetName: '18 de Julio',
                        streetNumber: '1214',
                        doorNumber: '3B',
                        coords: {
                            latitude: -34.867648,
                            longitude: -56.019677,
                        }
                    }
                },
                {
                    orderId: 2,
                    originAt: currentDate(),
                    status: 'ACCEPTED',
                    originAddress: {
                        addressId: 10,
                        streetName: 'Vazquez Ledesma',
                        streetNumber: '2983',
                        doorNumber: '2D',
                        coords: {
                            latitude: -34.920704,
                            longitude: -56.152935,
                        }
                    },
                    destinationAddress: {
                        addressId: 10,
                        streetName: '18 de Julio',
                        streetNumber: '1214',
                        doorNumber: '3B',
                        coords: {
                            latitude: -34.917702,
                            longitude: -56.149937,
                        }
                    }
                },
            ]
        })
    }

    onSelectOrderItem = (order) => {
        const { setOrderSelected } = this.props;
        setOrderSelected(order, this.onSuccess);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('MapOrderDetails');
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
            latitudeDelta: Math.abs(coordsA.latitude - midRegion.latitude) * 4,
            longitudeDelta: Math.abs(coordsA.longitude - midRegion.longitude),
        }
    }

    render() {
        const { data } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    // ListFooterComponent={
                    //     <View style={{ flex: 1, marginVertical: 40 }}></View>
                    // }
                    // ItemSeparatorComponent={() => <View style={{ flex: 1, marginHorizontal: 20, height: 1, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const { originAddress, destinationAddress } = item;
                        return (
                            <TouchableOpacity 
                            onPress={() => this.onSelectOrderItem(item)}
                                style={styles.card}>
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
                                        region='UY'
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
        createOrder: state.ordersReducer.createOrder,
        orderInfo: state.ordersReducer.orderInfo,
        paymentMethods: state.usersReducer.paymentMethods,
        isLoading: state.ordersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setOrderSelected })(ActiveUserOrders);
