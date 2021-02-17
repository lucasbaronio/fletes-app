import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RouterLogged from './routesLogged';
import Login from '../modules/auth/scenes/Login/Login';
import RegisterInit from '../modules/auth/scenes/RegisterInit/RegisterInit';
import Register from '../modules/auth/scenes/Register/Register';
import Splash from '../components/Splash/Splash';

const Stack = createStackNavigator();

type MyProps = {
    isLoggedIn: boolean,
}
type MyState = {
    isReady: boolean,
}

class Router extends Component<MyProps, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }
    }

    // componentDidMount() {
    //     let _this = this;
    //     store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
    //         this.props.userLoggedInToCache(() => {
    //             _this.setState({ isReady: true, /*exist, */isLoggedIn});
    //         });
    //     }));
    // }

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

export default connect(mapStateToProps, {})(Router);