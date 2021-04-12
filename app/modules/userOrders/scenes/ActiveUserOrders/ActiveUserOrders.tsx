import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod, createFinalOrder } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
import { showToast } from '../../../../components/Toast';
import { displayDate } from '../../utils/utils';
import MapViewDirections from 'react-native-maps-directions';

type MyProps = {
    getPaymentMethod: (successCB, errorCB) => void,
    setOrderPaymentMethod: (paymentMethod, successCB) => void,
    createPaymentMethod: (paymentMethod, successCB, errorCB) => void,
    createFinalOrder: (createOrder, successCB, errorCB) => void,
    createOrder: any,
    orderInfo: any,
    paymentMethods: any,
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
                    originAt: new Date(),
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
                    originAt: new Date(),
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

    onCreateOrder = () => {
        const { createFinalOrder, createOrder } = this.props;
        createFinalOrder(createOrder, this.onSuccessCreateOrder, this.onError);
    }

    onSuccessCreateOrder = () => {
        const { navigation } = this.props;
        // navigation.navigate('OrderDetails');
        alert('El pedido fue creado!!')
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
                            <View style={styles.card}>
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
                                    style={{ width: '100%', height: 150 }} >

                                    <Marker 
                                        draggable
                                        // image={require('../../../../../assets/driver.png')}
                                        pinColor="blue"
                                        coordinate={originAddress.coords}
                                        // anchor={{ x: 0.35, y: 0.32}}
                                        style={{ width: 10, height: 10 }} >
                                        
                                    </Marker>
                                    <Marker 
                                        draggable
                                        // image={require('../../../../../assets/driver.png')}
                                        pinColor="red"
                                        coordinate={destinationAddress.coords}
                                        // anchor={{ x: 0.35, y: 0.32}}
                                        style={{ width: 10, height: 10 }} >
                                        
                                    </Marker>
                                    <MapViewDirections
                                        origin={originAddress.coords}
                                        destination={destinationAddress.coords}
                                        apikey={'AIzaSyAyv9pHdOrn__bmpDQbVXL41Hg6725qJmk'}
                                        region='UY'
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                    />

                                </MapView>
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{displayDate(item.originAt)}</Text>
                                    <Text style={{ color: 'lightgrey' }}>{item.status}</Text>
                                </View>
                            </View>
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

export default connect(mapStateToProps, { setOrderPaymentMethod, getPaymentMethod, createPaymentMethod, createFinalOrder })(ActiveUserOrders);
