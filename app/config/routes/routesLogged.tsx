import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { isLargeScreen } from "../../styles/theme";

import CreateOrderRoutes from './createOrderRoutes';
import UserOrdersRoutes from './userOrdersRoutes';

import { actions as auth } from "../../modules/auth/index";
const { logOut } = auth;

const Drawer = createDrawerNavigator();

function RouterLogged({ logOut }) {
    return (
        <Drawer.Navigator 
            initialRouteName="Crear Pedido"
            // openByDefault
            drawerType={isLargeScreen ? 'permanent' : 'back'}
            drawerStyle={isLargeScreen ? null : { width: '80%' }}
            // overlayColor="transparent"
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem 
                        label="Logout" 
                        onPress={() => {
                            logOut(() => props.navigation.navigate("Login"), (error) => {
                                props.navigation.navigate("Login");
                                console.log(error);
                            })
                        }} />
                    </DrawerContentScrollView>
                )}}
        >
            <Drawer.Screen 
                name="CreateOrderRoutes" 
                component={CreateOrderRoutes} 
                options={{ 
                    title: 'Crear Pedido',
                    headerShown: false,
                }} />
            <Drawer.Screen 
                name="UserOrdersRoutes" 
                component={UserOrdersRoutes} 
                options={{
                    title: 'Pedidos Activos',
                    headerShown: false,
                }} />
            {/* <Drawer.Screen 
                name="LogOut" 
                component={LogOutScreen} 
                options={{
                    headerShown: true,
                }} /> */}
        </Drawer.Navigator>
    )
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { logOut })(RouterLogged);;

// function LogOut({ logOut, navigation }) {
//     return (
//       <View style={styles.container}>
//         <Button onPress={() => 
//             // logOut(() => {}, (error) => console.log(error))
//             logOut(() => navigation.navigate("Home"), (error) => {
//                 navigation.navigate("Home");
//                 console.log(error)})
//         }>
//             <Text>
//                 Cerrar Sesión
//             </Text>
//         </Button>
//       </View>
//     );
// }

// const LogOutScreen =  connect(mapStateToProps, { logOut })(LogOut);