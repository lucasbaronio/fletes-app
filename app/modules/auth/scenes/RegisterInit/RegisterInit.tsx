import React from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index"
const { registerInit } = auth;

import { showToast } from '../../../../components/Toast';
import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER,
    ERROR_INCORRECT_MOBILE_NUMBER
} from '../../../../config/strings';

type MyProps = {
    registerInit: (data, onSuccess, onError) => void,
    navigation: any,
    isLoading: boolean,
}
type MyState = {
    error: string,
    mobileNumber: string,
}

class RegisterInit extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            mobileNumber: '',
        }
    }

    goToLogIn = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('Login');
    }

    onSubmit = () => {
        Toast.hide();
        this.setState({ error: '' });
        
        const { mobileNumber } = this.state;
        const val1 = isNotEmpty(mobileNumber, () => {
            showToast(ERROR_EMPTY_MOBILE_NUMBER)
        });
        const val2 = val1 && validateMobileNumber(mobileNumber, () => {
            showToast(ERROR_INCORRECT_MOBILE_NUMBER)
        });
        
        if (val1 && val2) {
            const { registerInit } = this.props;
            registerInit({ mobileNumber }, this.onSuccess, this.onError);
        }
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
    }

    render() {
        const { isLoading } = this.props;
        return (
            <Container>
                <Content
                    padder={false}
                    scrollEnabled={false}>
                    
                    <View style={{ alignItems: 'center', margin: 40 }}>
                        <Image style={{ height: 180, width: 350 }} resizeMode='cover' source={require('../../../../../assets/fletes_icon.png')}/>
                    </View>

                    <Form style={{ paddingHorizontal: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>🇺🇾(+598)</Text>
                            <Input 
                                maxLength={9}
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", marginVertical: 10, paddingVertical: 10 }}>
                            <Button 
                                disable={isLoading}
                                style={{ flex: 1, flexDirection: 'row', justifyContent: "center", paddingVertical: 20 }}
                                onPress={this.onSubmit}>
                                {
                                    isLoading ?
                                    <ActivityIndicator />
                                    :
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                        Crear cuenta
                                    </Text>
                                }
                            </Button>
                        </View>
                    </Form>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                        <Text>Ya tienes una cuenta creada? </Text>
                        <Text 
                            style={{ color: 'blue' }} 
                            onPress={this.goToLogIn}>
                                Iniciar Sesión
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, { registerInit })(RegisterInit);
