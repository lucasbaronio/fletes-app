import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, SectionList } from 'react-native';
import { Button, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod, createFinalOrder } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
import { displayDate } from '../../utils/utils';
import CustomModal from '../../../../components/CustomModal';
import { extraOptionPriceTypes } from '../../../../config/utils';
import { fontSize } from '../../../../styles/theme';

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
    visibleModal: boolean,
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
            visibleModal: false,
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
        const { originAddress, destinationAddress, originAt, paymentMethodId } = createOrder;

        const extraOptionsList = this.getExtraOptions();
        const extraOptionsWithData = this.getExtraOptionsList(extraOptionsList);
        this.getExtraOptionsPrices(extraOptionsList);
        const vehicleTypeWithData = this.getVehicleType();

        const DATA = [
            {
                title: "Direcciones",
                data: [{
                    subtitle: 'Dirección origen',
                    value: `${originAddress.streetName} ${originAddress.streetNumber} / ${originAddress.doorNumber}`
                },{
                    subtitle: 'Dirección destino',
                    value: `${destinationAddress.streetName} ${destinationAddress.streetNumber} / ${destinationAddress.doorNumber}`
                }]
              },
              {
                title: "Detalle de la entrega",
                data: [{
                    subtitle: 'Fecha y hora transportista en Origen',
                    value: displayDate(originAt)
                },{
                    subtitle: 'Método de pago',
                    // value: `...${paymentMethods.find(item => item.id == paymentMethodId).finalNumbers}`
                    value: '...1234'
                }]
              },
              {
                title: "Detalles del transportista",
                data: [{
                    subtitle: 'Tipo de vehículo',
                    value: vehicleTypeWithData.name
                }].concat(extraOptionsWithData)
              }
        ];
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
            if (item.priceType == extraOptionPriceTypes.DYNAMIC) {
                return {
                    subtitle: 'Opción extra por hora',
                    value: `${item.text}`
                }
            }
            return {
                subtitle: 'Opción extra',
                value: `${item.text}`
            }
        });
    }
    getExtraOptionsPrices = (extraOptionsList) => {
        const { totalPricePerHour } = this.state;
        let totalPriceFixed = 0;
        let totalPricePerHourAux = 0;
        let extraOptions = [];
        extraOptionsList.forEach(item => {
            if (item.priceType == extraOptionPriceTypes.DYNAMIC) {
                totalPricePerHourAux += item.price;
            } else {
                totalPriceFixed += item.price;
            }
            extraOptions = extraOptions.concat(item);
        })
        this.setState({
            totalPriceFixed,
            extraOptions,
            totalPricePerHour: totalPricePerHour + totalPricePerHourAux,
        });
    }

    onCreateOrder = () => {
        const { createFinalOrder, createOrder } = this.props;
        console.log(createOrder);
        createFinalOrder(createOrder, this.onSuccessCreateOrder, this.onError);
    }

    onSuccessCreateOrder = () => {
        const { navigation } = this.props;
        navigation.popToTop();
        navigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
    }

    render() {
        const { data, totalPricePerHour, totalPriceFixed, vehicleType, extraOptions, error, visibleModal } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                <SectionList
                    ListHeaderComponent={
                        <View style={styles.containerHeaderComponent}>
                            {
                                vehicleType &&
                                <View style={styles.containerHeaderVehicleType}>
                                    <Text style={styles.titleHeaderVehicleType}>Tipo de vehículo:</Text>
                                    <View style={styles.subtitleHeaderVehicleType}>
                                        <Text>{vehicleType.name}</Text>
                                        <Text>${vehicleType.pricePerHour} / hora</Text>
                                    </View>
                                </View>
                            }
                                <View style={styles.containerHeaderExtraOptions}>
                                    <Text style={styles.titleHeaderExtraOptions}>Extras:</Text>
                                    {
                                        (extraOptions || []).map((item) => (
                                            <View 
                                                key={item.orderAvailableExtraOptionId} 
                                                style={styles.subtitleHeaderExtraOptions}>
                                                <View style={{ flex: .7 }}>
                                                    <Text>{item.text}</Text>
                                                </View>
                                                <View style={{ flex: .3, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text>${item.price}</Text>
                                                    {
                                                        item.priceType == extraOptionPriceTypes.DYNAMIC && 
                                                        <Text style={{ fontSize: fontSize.XS }}>por hora</Text>
                                                    }
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            <View style={styles.separatorHeader}></View>
                            <View style={[styles.containerTotalHeader,{ marginTop: 20 }]}>
                                <Text style={styles.keyTextTotalHeader}>Total fijo</Text>
                                <Text style={styles.valueTextTotalHeader}>${totalPriceFixed}</Text>
                            </View>
                            <View style={styles.containerTotalHeader}>
                                <Text style={styles.keyTextTotalHeader}>Total por hora</Text>
                                <Text style={styles.valueTextTotalHeader}>${totalPricePerHour}</Text>
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.footer}></View>
                    }
                    ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                    sections={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.constinerSectionItem}>
                                <Text style={styles.subtitleSectionItem}>{item.subtitle}</Text>
                                <Text style={styles.valueSectionItem}>{item.value}</Text>
                            </View>
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.containerSectionHeader}>
                            <Text style={styles.textSectionHeader}>{title}</Text>
                        </View>
                    )}
                />
                <View style={styles.containerButton}>
                    <Button 
                      // @ts-ignore
                      style={styles.button}
                      onPress={this.onCreateOrder}>
                        <Text style={styles.textButton}>
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
