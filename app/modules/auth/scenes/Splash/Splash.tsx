import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';

type MyProps = {
    login: (data, onSuccess, onError) => void,
    pushNotificationID: string,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
}
class Splash extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image 
                    style={{ height: '100%', width: '100%',backgroundColor: '#000000' }} 
                    resizeMode= "contain"
                    source={require('../../../../../assets/fletesapp_icon_dark.png')} />
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
