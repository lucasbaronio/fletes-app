import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, useWindowDimensions, FlatList, Pressable } from 'react-native';
import { Body, Button, CheckBox, List, ListItem, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
import { showToast, showToastLoading } from '../../../../components/Toast';
import SlidingPanelCreatePaymentMethod from '../../components/SlidingPanelCreatePaymentMethod';
import CustomModal from '../../../../components/CustomModal';
import { color, fontSize, fontWeight } from '../../../../styles/theme';

type MyProps = {
    getPaymentMethod: (successCB, errorCB) => void,
    setOrderPaymentMethod: (paymentMethod, successCB) => void,
    createPaymentMethod: (paymentMethod, successCB, errorCB) => void,
    createOrder: any,
    paymentMethods: any,
    isLoading: boolean,
    navigation: any,
}
type paymentMethod = {
    id: number,
    type: string,
    text: string,
    default: boolean,
    selected: boolean,
}
type MyState = {
    error: string,
    isLoading: boolean,
    visibleModal: boolean,
    paymentMethodSelected: paymentMethod[],
}
class PaymentMethod extends React.Component<MyProps, MyState> {
    map: any;
    sidingPanelCreatePaymentMethodOpen: any;
    sidingPanelCreatePaymentMethodClose: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            visibleModal: false,
            paymentMethodSelected: []
        };
    }

    componentDidMount() {
        const { getPaymentMethod, setOrderPaymentMethod } = this.props;
        getPaymentMethod(({ paymentMethods }) => {
            this.setState({
                paymentMethodSelected: paymentMethods.map((payment) => {
                    return { ...payment, selected: payment.default }
                }),
            });
            // setOrderPaymentMethod(paymentMethods.find(item => item.default), () => {});
        }, this.onError);
    }

    onCreatePaymentMethod = (paymentMethod) => {
        const { createPaymentMethod } = this.props;
        createPaymentMethod(paymentMethod, this.onSuccessCreatePaymentMethod, this.onError);
    }

    onSuccessCreatePaymentMethod = (paymentMethod) => {
        const { paymentMethodSelected } = this.state;
        this.setState({
            paymentMethodSelected: paymentMethodSelected.concat(paymentMethod)
        });
        this.sidingPanelCreatePaymentMethodClose();
    }

    onNextScreen = () => {
        const { navigation } = this.props;
        navigation.navigate('CreateOrderDetails');
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
    }

    onSelectPaymentMethod = (paymentMethod) => {
        const { paymentMethodSelected } = this.state;
        const { setOrderPaymentMethod } = this.props;
        const id = paymentMethod.id;
        const newPaymentMethodSelected = paymentMethodSelected.map((item) => {
          return { ...item, selected: item.id == id }
        });
        this.setState({ paymentMethodSelected: newPaymentMethodSelected })
        // setOrderPaymentMethod(paymentMethod, () => {});
    };

    render() {
        const { paymentMethodSelected, visibleModal } = this.state;
        const { isLoading } = this.props;

        return (
            <View style={styles.container}>
                <CustomModal onClose={() => this.setState({ visibleModal: false })} visible={visibleModal} message='Por ahora no se pueden crear nuevos metodos de pago, unicamente es posible en efectivo.' />
                <FlatList
                    data={paymentMethodSelected}
                    renderItem={({item}) =>
                        <ListItem 
                            key={item.id}
                            // style={{ backgroundColor: color.white.white }}
                            onPress={() => this.onSelectPaymentMethod(item)}>
                            <CheckBox color={color.primary.dark} checked={item.selected} />
                            <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 50, height: 50, marginHorizontal: 15, borderWidth: 0.3 }} 
                                    resizeMode='contain'
                                    source={item.type == 'cash' 
                                        ? require('../../../../../assets/cash.png')
                                        // ? require('../../../../../assets/visa.png')
                                        : require('../../../../../assets/mastercard.png')} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text>{item.text}</Text>
                                    {/* <Text>...{item.finalNumbers}</Text> */}
                                </View>
                                
                            </Body>
                        </ListItem>
                    }
                    ListFooterComponent={() => 
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 20 }}>
                            <Pressable 
                                style={{ flex: 1, marginHorizontal: 40, padding: 10, justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: color.primary.dark }}
                                // onPress={() => this.sidingPanelCreatePaymentMethodOpen()}>
                                onPress={() => this.setState({ visibleModal: true })}>
                                    <Text style={{ fontSize: fontSize.M, fontWeight: fontWeight.L, color: color.primary.dark, textAlign: 'center' }}>
                                        Crear uno nuevo
                                    </Text>
                            </Pressable>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.containerButton}>
                    <Pressable 
                        style={[styles.rowContainer, styles.button]}
                        onPress={this.onNextScreen}>
                            <Text style={styles.textButton}>
                                Ver detalle del Pedido
                            </Text>
                    </Pressable>
                </View>
                
                <SlidingPanelCreatePaymentMethod 
                    isLoading={isLoading}
                    closeSlidingPanel={c => { this.sidingPanelCreatePaymentMethodClose = c }}
                    openSlidingPanel={c => { this.sidingPanelCreatePaymentMethodOpen = c }}
                    onPress={this.onCreatePaymentMethod}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        createOrder: state.ordersReducer.createOrder,
        paymentMethods: state.usersReducer.paymentMethods,
        isLoading: state.usersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setOrderPaymentMethod, getPaymentMethod, createPaymentMethod })(PaymentMethod);
