import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import MapAddressOrigin from '../modules/orders/scenes/MapAddressOrigin/MapAddressOrigin';
import AddressSearchBar from '../modules/orders/components/AddressSearchBar';
import { Button, Icon } from 'native-base';
import MapAddressDestination from '../modules/orders/scenes/MapAddressDestination/MapAddressDestination';
import VehicleTypesGrid from '../modules/orders/scenes/VehicleTypesGrid/VehicleTypesGrid';
import MapAddress from '../modules/orders/scenes/MapAddress/MapAddress';
import PaymentMethod from '../modules/orders/scenes/PaymentMethod/PaymentMethod';
import CreateOrderDetails from '../modules/orders/scenes/CreateOrderDetails/CreateOrderDetails';

// import { actions as auth } from "../modules/auth/index"
// const { logOut } = auth;

const HomeStack = createStackNavigator();

function HomeRoutes(props) {
    return (
        <HomeStack.Navigator initialRouteName="MapAddressOrigin" >
            <HomeStack.Screen 
                name="MapAddress" 
                component={MapAddress} 
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
            <HomeStack.Screen 
                name="VehicleTypesGrid" 
                component={VehicleTypesGrid} 
                options={({ navigation }) => ({
                    title: 'Tipo de flete',
                })}
            />
            <HomeStack.Screen 
                name="PaymentMethod" 
                component={PaymentMethod} 
                options={({ navigation }) => ({
                    title: 'Metodo de pago',
                })}
            />
            <HomeStack.Screen 
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
        </HomeStack.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(HomeRoutes);;
