import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import { Body, Button, CheckBox, List, ListItem, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderPaymentMethod, createFinalOrder } = orders;
import { actions as users } from "../../../users/index";
const { getPaymentMethod, createPaymentMethod } = users;

import styles from './styles';
// import { windowWidth } from '../../../../styles/theme';
import { showToast, showToastLoading } from '../../../../components/Toast';
import SlidingPanelCreatePaymentMethod from '../../components/SlidingPanelCreatePaymentMethod';

type MyProps = {
    getPaymentMethod: (successCB, errorCB) => void,
    setOrderPaymentMethod: (paymentMethod, successCB) => void,
    createPaymentMethod: (paymentMethod, successCB, errorCB) => void,
    createFinalOrder: (createOrder, successCB, errorCB) => void,
    createOrder: any,
    paymentMethods: any,
    isLoading: boolean,
    navigation: any,
}
type paymentMethod = {
    id: number,
    finalNumbers: number,
    exp: string,
    default: boolean,
    selected: boolean,
}
type MyState = {
    error: string,
    isLoading: boolean,
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
            setOrderPaymentMethod(paymentMethods.find(item => item.default), () => {});
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

    // onCreateOrder = () => {
    //     const { createFinalOrder, createOrder } = this.props;
    //     createFinalOrder(createOrder, this.onSuccessCreateOrder, this.onError);
    // }

    // onSuccessCreateOrder = () => {
    //     const { navigation } = this.props;
    //     // navigation.navigate('OrderDetails');
    // }

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
        setOrderPaymentMethod(paymentMethod, () => {});
    };

    render() {
        const { paymentMethodSelected } = this.state;
        const { isLoading } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={paymentMethodSelected}
                    renderItem={({item}) =>
                        <ListItem 
                            key={item.id}
                            onPress={() => this.onSelectPaymentMethod(item)}>
                            <CheckBox checked={item.selected} />
                            <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 50, height: 50, marginHorizontal: 15, borderWidth: 0.3 }} 
                                    resizeMode='contain'
                                    source={item.id % 2 == 0 
                                        ? require('../../../../../assets/visa.png')
                                        : require('../../../../../assets/mastercard.png')} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text>Últimos números de la tarjeta:</Text>
                                    <Text>...{item.finalNumbers}</Text>
                                </View>
                                
                            </Body>
                        </ListItem>
                    }
                    ListFooterComponent={() => 
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 20 }}>
                            <Button 
                                rounded
                                bordered
                                // @ts-ignore
                                style={{ flex: 1, marginHorizontal: 40, justifyContent: 'center' }}
                                onPress={() => this.sidingPanelCreatePaymentMethodOpen()}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                        Crear uno nuevo
                                    </Text>
                            </Button>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.containerButton}>
                    <Button 
                      // @ts-ignore
                      style={styles.button}
                      onPress={this.onNextScreen}>
                        <Text style={styles.textButton}>
                            Ver detalle del Pedido
                        </Text>
                    </Button>
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

export default connect(mapStateToProps, { setOrderPaymentMethod, getPaymentMethod, createPaymentMethod, createFinalOrder })(PaymentMethod);
