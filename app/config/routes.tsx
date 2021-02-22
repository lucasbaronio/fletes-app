import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store'
import { Toast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RouterLogged from './routesLogged';
import Login from '../modules/auth/scenes/Login/Login';
import RegisterInit from '../modules/auth/scenes/RegisterInit/RegisterInit';
import Register from '../modules/auth/scenes/Register/Register';
import PasswordRecoverInit from '../modules/auth/scenes/PasswordRecoverInit/PasswordRecoverInit';
import PasswordRecover from '../modules/auth/scenes/PasswordRecover/PasswordRecover';
// import Splash from '../components/Splash/Splash';
import { checkLoginStatus } from "../modules/auth/actions";

import { getToken } from '../modules/security';

const Stack = createStackNavigator();

type MyProps = {
    isLoggedIn: boolean,
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
        const token = await getToken();
        if (token) {
            store.dispatch(checkLoginStatus(() => {}, this.onError))
        }
    }

    onError = (error) => {
        this.setState({ error });
        Toast.show({
            text: this.state.error,
            buttonText: "Aceptar",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" },
            duration: 300000
        })
    }

    render() {
        const { isLoggedIn } = this.props;
        // if (!this.state.isReady)
        //     return <Splash/>

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isLoggedIn ? "RouterLogged" : "Login"}>
                    <Stack.Screen
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
                            title: 'Recuperar cuenta',
                            headerTransparent: true,
                            // headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="PasswordRecover"
                        component={PasswordRecover}
                        options={{
                            title: 'Recuperar cuenta',
                            headerTransparent: true,
                            // headerShown: false,
                        }}
                    />
                    <Stack.Screen 
                        name="RouterLogged" 
                        component={RouterLogged} 
                        options={{ 
                            headerShown: false
                        }}
                    />
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

export default connect(mapStateToProps, { checkLoginStatus })(Router);