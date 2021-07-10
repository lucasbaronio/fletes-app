import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, SectionList, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';
import { currentDate, dateToFrontend, timeDiffSeconds, displayDate } from '../../orders/utils/utils';
import { fontSize, fontWeight } from '../../../styles/theme';
import { extraOptionPriceTypes, getOrderStatusCurrentTime, statusOrder } from '../../../config/utils';
import { TIME_SEC_BASE_PRICE } from '../../../config/constants';

type MyProps = {
    order: any,
    route: any,
    navigation: any,
}
type MyState = {
    order: any,
    data: any,
    totalPricePerHour: number,
    extraOptionsDynamicTotalPrice: number,
    finalPrice: number,
    hours: number,
    minutes: number,
    basePriceTitle: string,
    basePriceHour: number,
    basePriceMinutes: number,
}
class OrderDetails extends React.Component<MyProps, MyState> {
    refreshIntervalId;
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            data: [],
            totalPricePerHour: 0,
            extraOptionsDynamicTotalPrice: 0,
            finalPrice: 0,
            hours: 0,
            minutes: 0,
            basePriceTitle: '',
            basePriceHour: Math.trunc(TIME_SEC_BASE_PRICE / 60 / 60),
            basePriceMinutes: Math.trunc((TIME_SEC_BASE_PRICE / 60) % 60),
        };
    }

    componentDidMount() {
        const { order } = this.props.route.params;
        const { status, originAddress, destinationAddress, originAt, paymentMethod, vehicleType, extraOptions, vehicle, shipper, user } = order;

        const extraOptionsDynamicTotalPrice = this.getExtraOptionsDynamicPrices(extraOptions);
        this.setState({ 
            order, 
            extraOptionsDynamicTotalPrice 
        }, () => this.calculatePricePerHour());
        this.refreshIntervalId = setInterval(() => this.calculatePricePerHour(), 60000);

        const extraOptionsWithData = this.getExtraOptionsList(extraOptions);        

        let shipperData = shipper ? [{
            subtitle: 'Nombre',
            value: shipper.name ? shipper.name : 'Sin definir'
        }] : [];
        shipperData = shipperData.concat([{
            subtitle: 'Tipo de vehículo',
            value: vehicleType.name
        }]);
        shipperData = vehicle ? shipperData.concat([{
            subtitle: "Modelo del vehículo",
            value: vehicle.model
        },{
            subtitle: "Matrícula",
            value: vehicle.registration
        }]) : shipperData;

        let DATA = [
            {
                title: "Detalles del usuario",
                data: [{
                    subtitle: 'Nombre',
                    value: user.name ? user.name : 'Sin definir'
                }]
            },
            {
                title: "Detalles de la entrega",
                data: [{
                    // subtitle: 'Fecha y hora transportista en Origen',
                    // value: displayDate(originAt)
                    subtitle: getOrderStatusCurrentTime(order).title,
                    value: getOrderStatusCurrentTime(order).value,
                },{
                    subtitle: 'Método de pago',
                    // value: `...${paymentMethods.find(item => item.id == paymentMethodId).finalNumbers}`
                    value: 'Efectivo al momento de finalizado el pedido.'
                },{
                    subtitle: 'Dirección origen',
                    value: `${originAddress.streetName} ${originAddress.streetNumber} / ${originAddress.doorNumber}`
                },{
                    subtitle: 'Dirección destino',
                    value: `${destinationAddress.streetName} ${destinationAddress.streetNumber} / ${destinationAddress.doorNumber}`
                }]
            },
            {
                title: "Detalles del transportista",
                data: shipperData,
            },
            {
                title: "Opciones extra",
                data: extraOptionsWithData
            }
        ]
        if (status == statusOrder.COMPLETED) {
            DATA = DATA.concat({
                title: 'Calificación del usuario',
                data: [{
                    subtitle: 'Puntuación',
                    value: order.rating + ' / 5'
                },{
                    subtitle: 'Comentarios del usuario',
                    value: order.comments
                }]
            })
        }
        this.setState({
            data: DATA,
        });
    }

    componentWillUnmount() {
        clearInterval(this.refreshIntervalId);
    }

    getExtraOptionsList = (extraOptions) => {
        if (!extraOptions) return [];
        return extraOptions.map((item, index) => {
            return {
                subtitle: item.priceType == extraOptionPriceTypes.FIXED 
                ? (index + 1).toString() + ' - Extra'
                : (index + 1).toString() + ' - Extra por hora',
                value: `${item.text}`
            }
        })
    }

    getExtraOptionsDynamicPrices = (extraOptions) => {
        let extraOptionsDynamicTotalPrice = 0
        if (extraOptions) {
            extraOptions.forEach(item => {
                if (item.priceType == extraOptionPriceTypes.DYNAMIC) {
                    extraOptionsDynamicTotalPrice += item.price
                }
            });
        }
        return extraOptionsDynamicTotalPrice;
    }

    calculatePricePerHour = () => {
        const { order, extraOptionsDynamicTotalPrice } = this.state; 
        if (order) {
            const { shipperArrivedAtOriginAt, shipperCompletedAt, pricePerHour, fixedPrice } = order;
            let diff = 0;
            if (shipperArrivedAtOriginAt == null && shipperCompletedAt == null) diff = 0;
            else if (shipperCompletedAt == null) diff = timeDiffSeconds(currentDate(), dateToFrontend(shipperArrivedAtOriginAt));
            else {
                diff = timeDiffSeconds(dateToFrontend(shipperCompletedAt), dateToFrontend(shipperArrivedAtOriginAt));
                clearInterval(this.refreshIntervalId);
            }
            const hours = Math.trunc(diff / 60 / 60);
            const minutes = Math.trunc((diff / 60) % 60);
            let basePriceTitle = 'Total por hora';
            if (diff <= TIME_SEC_BASE_PRICE) {
                diff = TIME_SEC_BASE_PRICE;
                basePriceTitle = 'Total por hora (precio base)';
            }
            const totalPricePerHour = Math.round(((pricePerHour + extraOptionsDynamicTotalPrice) * diff / 60 / 60) * 100) / 100
            this.setState({
                hours,
                minutes,
                totalPricePerHour,
                finalPrice: totalPricePerHour + fixedPrice,
                basePriceTitle,
            });
        }
    }

    render() {
        const { order } = this.state;
        if (!order) {
            return (<View><ActivityIndicator /></View>)
        }
        const { vehicleType, extraOptions, fixedPrice } = order;
        const { data, totalPricePerHour, finalPrice, hours, minutes, basePriceTitle, basePriceHour, basePriceMinutes } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {/* <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/> */}
                <SectionList
                    ListHeaderComponent={
                        <View style={styles.containerHeaderComponent}>
                            {
                                vehicleType &&
                                <View style={styles.containerHeaderVehicleType}>
                                    <Text style={styles.titleHeaderVehicleType}>Tipo de vehículo:</Text>
                                    <View style={styles.subtitleHeaderVehicleType}>
                                        <Text>{vehicleType.name}</Text>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>${vehicleType.pricePerHour}</Text>
                                            <Text style={{ fontSize: fontSize.XS }}>por hora</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                                <View style={styles.containerHeaderExtraOptions}>
                                    <Text style={styles.titleHeaderExtraOptions}>Extras:</Text>
                                    {
                                        (extraOptions || []).map((item) => (
                                            <View 
                                                key={item.orderExtraOptionId} 
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
                                <Text style={styles.valueTextTotalHeader}>${fixedPrice}</Text>
                            </View>
                            <View style={styles.containerTotalHeader}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={styles.keyTextTotalHeader}>{basePriceTitle}</Text>
                                    <Text style={{ fontSize: fontSize.XS }}><Text style={{ fontWeight: fontWeight.M, fontSize: fontSize.XS }}>Tiempo precio base:</Text> {basePriceHour} hs y {basePriceMinutes} mins</Text>
                                    <Text style={{ fontSize: fontSize.XS }}><Text style={{ fontWeight: fontWeight.M, fontSize: fontSize.XS }}>Tiempo actual:</Text> {hours} hs y {minutes} mins</Text>
                                </View>
                                <Text style={styles.valueTextTotalHeader}>${totalPricePerHour}</Text>
                            </View>
                            <View style={styles.separatorHeader}></View>
                            <View style={[styles.containerTotalHeader,{ marginTop: 20 }]}>
                                <Text style={styles.keyTextTotalHeader}>Total</Text>
                                <Text style={styles.valueTextTotalHeader}>${finalPrice}</Text>
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
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.ordersReducer.isLoading,
    }
}

export default connect(mapStateToProps, {  })(OrderDetails);
