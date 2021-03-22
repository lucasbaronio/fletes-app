import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import withNotificationExpoHOC from '../components/HOCs/push/withNotificationExpoHOC';
import RouterLogged from './routesLogged';
import Login from '../modules/auth/scenes/Login/Login';
import RegisterInit from '../modules/auth/scenes/RegisterInit/RegisterInit';
import Register from '../modules/auth/scenes/Register/Register';
import PasswordRecoverInit from '../modules/auth/scenes/PasswordRecoverInit/PasswordRecoverInit';
import PasswordRecover from '../modules/auth/scenes/PasswordRecover/PasswordRecover';
import AddressSearchBar from '../modules/orders/components/AddressSearchBar';
// import Splash from '../components/Splash/Splash';
import { checkLoginStatus } from "../modules/auth/actions";

import { getToken } from '../modules/security';
import { showToast } from '../components/Toast';

const Stack = createStackNavigator();

type MyProps = {
    isLoggedIn: boolean,
    checkLoginStatus: (onSuccess, onError) => void,
    navigation: any,
}
type MyState = {
    isReady: boolean,
    error: string,
}
class Router extends Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            error: '',
        }
    }

    async componentDidMount() {
        const { checkLoginStatus } = this.props;
        const token = await getToken();
        if (token) {
            checkLoginStatus(() => {}, () => {});
        }
    }

    render() {
        const { isLoggedIn } = this.props;
        // if (!this.state.isReady)
        //     return <Splash/>

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isLoggedIn ? "RouterLogged" : "Login"}>
                    {!isLoggedIn ?
                        (<><Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                title: 'Iniciar Sesión',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="RegisterInit"
                            component={RegisterInit}
                            options={{
                                title: 'Crear cuenta',
                                headerTransparent: true,
                                // headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{
                                title: 'Crear cuenta',
                                headerTransparent: true,
                                // headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="PasswordRecoverInit"
                            component={PasswordRecoverInit}
                            options={{
                                title: 'Recuperar contraseña',
                                headerTransparent: true,
                                // headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="PasswordRecover"
                            component={PasswordRecover}
                            options={{
                                title: 'Recuperar contraseña',
                                headerTransparent: true,
                                // headerShown: false,
                            }}
                        /></>)
                    :
                        <><Stack.Screen 
                            name="RouterLogged" 
                            component={RouterLogged} 
                            options={{ 
                                headerShown: false
                            }}
                        />
                        <Stack.Screen 
                            name="AddressSearchBar" 
                            component={AddressSearchBar} 
                            options={{ 
                                // headerShown: false
                            }}
                        /></>}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps, { checkLoginStatus })(withNotificationExpoHOC(Router));