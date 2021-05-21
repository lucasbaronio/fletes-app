import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import MapUserOrderDetails from '../../modules/userOrders/scenes/MapUserOrderDetails/MapUserOrderDetails';
import { color, iconSize, isiOS } from '../../styles/theme';
import ActiveUserOrders from '../../modules/userOrders/scenes/ActiveUserOrders/ActiveUserOrders';
import OrderDetails from '../../modules/shared/OrderDetails/OrderDetails';

// import { actions as auth } from "../modules/auth/index"
// const { logOut } = auth;

const UserOrdersStack = createStackNavigator();

function UserActiveOrdersRoutes(props) {
    return (
        <UserOrdersStack.Navigator initialRouteName="ActiveUserOrders" >
            <UserOrdersStack.Screen 
                name="ActiveUserOrders" 
                component={ActiveUserOrders} 
                options={({ navigation }) => ({
                    title: 'Pedidos activos',
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
            <UserOrdersStack.Screen 
                name="MapUserOrderDetails" 
                component={MapUserOrderDetails} 
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <Button transparent
                            // Aca despues hay que cambiarlo porque va haber un HistoryUserOrders
                          onPress={() => navigation.navigate('ActiveUserOrders')}
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
            <UserOrdersStack.Screen 
                name="OrderDetails" 
                component={OrderDetails} 
                options={({ navigation }) => ({
                    title: 'Detalles del Pedido',
                })}
            />
        </UserOrdersStack.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(UserActiveOrdersRoutes);
