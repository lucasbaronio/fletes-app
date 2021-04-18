import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import MapShipperOrderDetails from '../../modules/shipperOrders/scenes/MapShipperOrderDetails/MapShipperOrderDetails';
import { color, iconSize } from '../../styles/theme';
import PendingShipperOrders from '../../modules/shipperOrders/scenes/PendingShipperOrders/PendingShipperOrders';

const ShipperOrdersStack = createStackNavigator();

function ShipperOrdersRoutes(props) {
    return (
        <ShipperOrdersStack.Navigator initialRouteName="PendingShipperOrders" >
            <ShipperOrdersStack.Screen 
                name="PendingShipperOrders" 
                component={PendingShipperOrders} 
                options={({ navigation }) => ({
                    title: 'Pedidos Disponibles',
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
                            // Aca despues hay que cambiarlo porque va haber un ActiveShipperOrders 
                          onPress={() => navigation.navigate('PendingShipperOrders')}
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
        </ShipperOrdersStack.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(ShipperOrdersRoutes);
