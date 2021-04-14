import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';

import { actions as auth } from "../../index";
const { login } = auth;

type MyProps = {
    login: (data, onSuccess, onError) => void,
    pushNotificationID: string,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    mobileNumber: string,
    password: string,
    showPassword: boolean,
}
class Splash extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            // mobileNumber: '',
            password: '',
            mobileNumber: '091000000',
            // password: 'strongPassword',
            showPassword: false,
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image 
                    style={{ height: '100%', width: '100%' }} 
                    resizeMode= "cover"
                    source={require('../../../../../assets/splash.png')} />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading,
    }
}

export default connect(mapStateToProps, { })(Splash);
