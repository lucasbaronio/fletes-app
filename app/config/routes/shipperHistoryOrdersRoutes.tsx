import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import MapShipperOrderDetails from '../../modules/shipperOrders/scenes/MapShipperOrderDetails/MapShipperOrderDetails';
import { color, iconSize } from '../../styles/theme';
import HistoryShipperOrders from '../../modules/shipperOrders/scenes/HistoryShipperOrders/HistoryShipperOrders';
import OrderDetails from '../../modules/shared/OrderDetails/OrderDetails';

const ShipperOrdersStack = createStackNavigator();

function ShipperHistoryOrdersRoutes(props) {
    return (
        <ShipperOrdersStack.Navigator initialRouteName="HistoryShipperOrders" >
            <ShipperOrdersStack.Screen 
                name="HistoryShipperOrders" 
                component={HistoryShipperOrders} 
                options={({ navigation }) => ({
                    title: 'Pedidos Históricos',
                    headerShown: true,
                    headerLeft: () => (
                        <Button transparent
                          onPress={() => navigation.toggleDrawer()} >
                            <Icon 
                                name="menu-outline"
                                style={{
                                    fontSize: iconSize.XL, 
                                    color: color.grey.slateGrey
                                }} />
                        </Button>
                    ),
                })}
            />
            <ShipperOrdersStack.Screen 
                name="MapShipperOrderDetails" 
                component={MapShipperOrderDetails} 
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <Button transparent
                          onPress={() => navigation.navigate('ShipperHistoryOrdersRoutes', { screen: 'HistoryShipperOrders' })}
                          color={color.black.black} >
                            <Icon 
                                ios='chevron-back-circle-outline' 
                                android="arrow-back-circle-outline"
                                style={{
                                    fontSize: iconSize.XL, 
                                    color: color.grey.slateGrey
                                }} />
                        </Button>
                    ),
                })}
            />
            <ShipperOrdersStack.Screen 
                name="OrderDetails" 
                component={OrderDetails} 
                options={({ navigation }) => ({
                    title: 'Detalles del Pedido',
                })}
            />
        </ShipperOrdersStack.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(ShipperHistoryOrdersRoutes);
