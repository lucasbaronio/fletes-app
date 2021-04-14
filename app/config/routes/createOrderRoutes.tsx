import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
// import MapAddressOrigin from '../modules/orders/scenes/MapAddressOrigin/MapAddressOrigin';
// import MapAddressDestination from '../modules/orders/scenes/MapAddressDestination/MapAddressDestination';
// import AddressSearchBar from '../modules/orders/components/AddressSearchBar';
import { Button, Icon } from 'native-base';
import VehicleTypesGrid from '../../modules/orders/scenes/VehicleTypesGrid/VehicleTypesGrid';
import MapAddress from '../../modules/orders/scenes/MapAddress/MapAddress';
import PaymentMethod from '../../modules/orders/scenes/PaymentMethod/PaymentMethod';
import CreateOrderDetails from '../../modules/orders/scenes/CreateOrderDetails/CreateOrderDetails';
import { color, iconSize } from '../../styles/theme';

// import { actions as auth } from "../modules/auth/index"
// const { logOut } = auth;

const CreateOrderStack = createStackNavigator();

function CreateOrderRoutes(props) {
    return (
        <CreateOrderStack.Navigator initialRouteName="MapAddressOrigin" >
            <CreateOrderStack.Screen 
                name="MapAddress" 
                component={MapAddress} 
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <Button transparent
                          onPress={() => navigation.toggleDrawer()}
                          color={color.black.black} >
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
            {/* <HomeStack.Screen 
                name="MapAddressOrigin" 
                component={MapAddressOrigin} 
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <Button transparent
                          onPress={() => navigation.toggleDrawer()}
                          color="#fff" >
                            <Icon name="menu-outline"></Icon>
                        </Button>
                      ),
                })}
            />
            <HomeStack.Screen 
                name="MapAddressDestination" 
                component={MapAddressDestination} 
                options={({ navigation }) => ({
                    title: '',
                    headerTransparent: true,
                    // headerLeft: () => (
                    //     <Button transparent
                    //       onPress={() => navigation.toggleDrawer()}
                    //       color="#fff" >
                    //         <Icon name="menu-outline"></Icon>
                    //     </Button>
                    //   ),
                })}
            /> */}
            <CreateOrderStack.Screen 
                name="VehicleTypesGrid" 
                component={VehicleTypesGrid} 
                options={({ navigation }) => ({
                    title: 'Tipo de flete',
                })}
            />
            <CreateOrderStack.Screen 
                name="PaymentMethod" 
                component={PaymentMethod} 
                options={({ navigation }) => ({
                    title: 'Metodo de pago',
                })}
            />
            <CreateOrderStack.Screen 
                name="CreateOrderDetails" 
                component={CreateOrderDetails} 
                options={({ navigation }) => ({
                    title: 'Mi Pedido',
                })}
            />
            {/* <HomeStack.Screen 
                name="AddressSearchBar" 
                component={AddressSearchBar} 
                options={{
                    headerShown: true,
                }} /> */}
        </CreateOrderStack.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(CreateOrderRoutes);;
