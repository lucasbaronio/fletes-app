import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, FlatList, SafeAreaView, ScrollView, SectionList } from 'react-native';
import { Body, Button, CheckBox, ListItem, Separator, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod, createFinalOrder } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { displayDateFromFormat } from '../../utils/utils';
import { windowWidth } from '../../../../styles/theme';

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
    extraOptions: any,
    vehicleType: any,
    totalPricePerHour: number,
    totalPriceFixed: number,
}
class CreateOrderDetails extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            data: [],
            extraOptions: [],
            vehicleType: null,
            totalPricePerHour: 0,
            totalPriceFixed: 0,
        };
    }

    componentDidMount() {
        const { totalPricePerHour } = this.state;
        const { createOrder, paymentMethods } = this.props;
        const { originAddress, destinationAddress, date, paymentMethodId } = createOrder;

        const extraOptionsList = this.getExtraOptions();
        const extraOptionsWithData = this.getExtraOptionsList(extraOptionsList);
        this.getExtraOptionsPrices(extraOptionsList);
        const vehicleTypeWithData = this.getVehicleType();

        const DATA = [
            {
                title: "Direcciones",
                data: [{
                    subtitle: 'Direccion origen',
                    value: `${originAddress.streetName} ${originAddress.streetNumber} / ${originAddress.doorNumber}`
                },{
                    subtitle: 'Direccion destino',
                    value: `${destinationAddress.streetName} ${destinationAddress.streetNumber} / ${destinationAddress.doorNumber}`
                }]
              },
              {
                title: "Detalle de la entrega",
                data: [{
                    subtitle: 'Fecha y hora transportista en Origen',
                    value: displayDateFromFormat(date, 'YYYYMMDDHHmm')
                },{
                    subtitle: 'Método de pago',
                    value: `...${paymentMethods.find(item => item.id == paymentMethodId).finalNumbers}`
                }]
              },
              {
                title: "Detalles del transportista",
                data: [{
                    subtitle: 'Tipo de vehículo',
                    value: vehicleTypeWithData.name
                }].concat(extraOptionsWithData)
              }
        ]
        this.setState({
            data: DATA,
            totalPricePerHour: totalPricePerHour + vehicleTypeWithData.pricePerHour,
            vehicleType: vehicleTypeWithData
        });
    }

    getVehicleType = () => {
        const { createOrder, orderInfo } = this.props;
        const { vehicleTypeId } = createOrder;
        return orderInfo.vehicleTypes.find(item => item.vehicleTypeId == vehicleTypeId)
    }

    getExtraOptions = () => {
        const { createOrder, orderInfo } = this.props;
        return orderInfo.extraOptions.filter(item => createOrder.extraOptions.includes(item.orderAvailableExtraOptionId));
    }

    getExtraOptionsList = (extraOptionsList) => {
        return extraOptionsList.map(item => {
            return {
                subtitle: 'Opción extra',
                // value: `${item.text} por $${item.price}`
                value: `${item.text}`
            }
        })
    }
    getExtraOptionsPrices = (extraOptionsList) => {
        let totalPriceFixed = 0;
        let extraOptions = [];
        extraOptionsList.forEach(item => {
            totalPriceFixed += item.price;
            extraOptions = extraOptions.concat(item);
        })
        this.setState({
            totalPriceFixed,
            extraOptions,
        });
    }

    // onNextScreen = () => {
    //     const { navigation } = this.props;
    //     navigation.navigate('OrderDetails');
    // }

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

    render() {
        const { data, totalPricePerHour, totalPriceFixed, vehicleType, extraOptions } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    ListHeaderComponent={
                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 15 }}>
                            {
                                vehicleType &&
                                <View style={{ flex: 1, flexDirection: 'column', marginVertical: 5 }}>
                                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Tipo de vehículo:</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginLeft: 20 }}>
                                        <Text style={{ flex: 1 }}>{vehicleType.name}</Text>
                                        <Text style={{  }}>${vehicleType.pricePerHour} / hora</Text>
                                    </View>
                                </View>
                            }
                                <View style={{ flex: 1, flexDirection: 'column', marginVertical: 5 }}>
                                    <Text style={{ flex: 1, fontWeight: 'bold' }}>Extras:</Text>
                                    {
                                        (extraOptions || []).map((item) => (
                                            <View key={item.orderAvailableExtraOptionId} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginLeft: 20 }}>
                                                <Text style={{ flex: 1 }}>{item.text}</Text>
                                                <Text style={{  }}>${item.price}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            <View style={{ width: '100%', height: 10, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 20 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>Total fijo</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>${totalPriceFixed}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>Total por hora</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>${totalPricePerHour}</Text>
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={{ flex: 1, marginVertical: 40 }}></View>
                    }
                    ItemSeparatorComponent={() => <View style={{ flex: 1, marginHorizontal: 20, height: 1, borderBottomWidth: 0.3, borderBottomColor: 'lightgrey' }}></View>}
                    sections={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.subtitle}</Text>
                                <Text style={{ color: 'grey' }}>{item.value}</Text>
                            </View>
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ paddingHorizontal: 20, paddingBottom: 15, paddingTop: 25, backgroundColor: 'whitesmoke', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
                        </View>
                    )}
                />
                <View style={[styles.button, { 
                    bottom: 20,
                    left: (windowWidth * 0.1) / 2
                  }]}>
                    <Button 
                      // @ts-ignore
                      style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}
                      onPress={this.onCreateOrder}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                            Crear Pedido
                        </Text>
                    </Button>
                </View>
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

export default connect(mapStateToProps, { setOrderPaymentMethod, getPaymentMethod, createPaymentMethod, createFinalOrder })(CreateOrderDetails);
