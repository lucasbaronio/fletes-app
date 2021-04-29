import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import MapShipperOrderDetails from '../../modules/shipperOrders/scenes/MapShipperOrderDetails/MapShipperOrderDetails';
import { color, iconSize } from '../../styles/theme';
import ActiveShipperOrders from '../../modules/shipperOrders/scenes/ActiveShipperOrders/ActiveShipperOrders';

const ShipperOrdersStack = createStackNavigator();

function ShipperActiveOrdersRoutes(props) {
    return (
        <ShipperOrdersStack.Navigator initialRouteName="ActiveShipperOrders" >
            <ShipperOrdersStack.Screen 
                name="ActiveShipperOrders" 
                component={ActiveShipperOrders} 
                options={({ navigation }) => ({
                    title: 'Pedidos Activos',
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
                          onPress={() => navigation.navigate('ShipperActiveOrdersRoutes', { screen: 'ActiveShipperOrders' })}
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

export default connect(mapStateToProps, { })(ShipperActiveOrdersRoutes);
