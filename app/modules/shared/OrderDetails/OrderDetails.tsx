import React from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, SectionList, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';
import { currentDate, dateToFrontend, timeDiffSeconds, displayDate } from '../../orders/utils/utils';
import { fontSize } from '../../../styles/theme';

type MyProps = {
    order: any,
    route: any,
    navigation: any,
}
type MyState = {
    order: any,
    data: any,
    totalPricePerHour: number,
    finalPrice: number,
    hours: number,
    minutes: number,
}
class OrderDetails extends React.Component<MyProps, MyState> {
    refreshIntervalId;
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            data: [],
            totalPricePerHour: 0,
            finalPrice: 0,
            hours: 0,
            minutes: 0,
        };
    }

    componentDidMount() {
        const { order } = this.props.route.params;
        this.setState({ order }, () => this.calculatePricePerHour());
        this.refreshIntervalId = setInterval(() => this.calculatePricePerHour(), 60000);

        const { originAddress, destinationAddress, originAt, paymentMethod, vehicleType, extraOptions, vehicle, shipper } = order;
        const extraOptionsWithData = this.getExtraOptionsList(extraOptions);

        let shipperData = [{
            subtitle: 'Tipo de vehículo',
            value: vehicleType.name
        }];
        shipperData = shipper ? shipperData.concat([{
            subtitle: 'Nombre',
            value: shipper.name
        }]) : shipperData;
        shipperData = vehicle ? shipperData.concat([{
            subtitle: "Modelo del vehículo",
            value: vehicle.model
        },{
            subtitle: "Matrícula",
            value: vehicle.registration
        }]) : shipperData;

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
                data: shipperData,
              },
              {
                title: "Opciones extra",
                data: extraOptionsWithData
              }
        ]
        this.setState({
            data: DATA,
        });
    }

    componentWillUnmount() {
        clearInterval(this.refreshIntervalId);
    }

    getExtraOptionsList = (extraOptions) => {
        return extraOptions.map((item, index) => {
            return {
                subtitle: 'Extra ' + (index + 1).toString(),
                // value: `${item.text} por $${item.price}`
                value: `${item.text}`
            }
        })
    }

    // getExtraOptionsPrices = (extraOptionsList) => {
    //     let totalPriceFixed = 0;
    //     let extraOptions = [];
    //     extraOptionsList.forEach(item => {
    //         totalPriceFixed += item.price;
    //         extraOptions = extraOptions.concat(item);
    //     })
    //     this.setState({
    //         totalPriceFixed,
    //         extraOptions,
    //     });
    // }

    calculatePricePerHour = () => {
        const { order } = this.state;
        console.log('calculatePricePerHour', order);
        if (order) {
            const { shipperArrivedAtOriginAt, shipperCompletedAt, pricePerHour, fixedPrice } = order;
            let diff = 0;
            if (shipperArrivedAtOriginAt == null && shipperCompletedAt == null) diff = 0;
            else if (shipperCompletedAt == null) diff = timeDiffSeconds(currentDate(), dateToFrontend(shipperArrivedAtOriginAt));
            else {
                diff = timeDiffSeconds(dateToFrontend(shipperCompletedAt), dateToFrontend(shipperArrivedAtOriginAt));
                clearInterval(this.refreshIntervalId);
            }
            this.setState({
                hours: Math.trunc(diff / 60 / 60),
                minutes: Math.trunc((diff / 60) % 60),
                totalPricePerHour: Math.round((pricePerHour * diff / 60 / 60) * 100) / 100,
                finalPrice: (Math.round((pricePerHour * diff / 60 / 60) * 100) / 100) + fixedPrice,
            });
        }
    }

    render() {
        // const { data, totalPricePerHour, totalPriceFixed, vehicleType, extraOptions } = this.state;
        const { order } = this.state;
        if (!order) {
            return (<View><ActivityIndicator /></View>)
        }
        const { vehicleType, extraOptions, fixedPrice } = order;
        const { data, totalPricePerHour, finalPrice, hours, minutes } = this.state;
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
                                        <Text>${vehicleType.pricePerHour} / hora</Text>
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
                                                <Text>{item.text}</Text>
                                                <Text>${item.price}</Text>
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
                                    <Text style={styles.keyTextTotalHeader}>Total por hora</Text>
                                    <Text style={{ fontSize: fontSize.XS }}>({hours} hs y {minutes} mins)</Text>
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
