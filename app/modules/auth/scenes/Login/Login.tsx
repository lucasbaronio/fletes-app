import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index";
const { login } = auth;

// const error = {
//     general: "",
//     email: "",
//     password: ""
// }

type MyProps = {
    login: (data, onSuccess, onError) => void,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    // error: {
    //     general: string,
    //     email: string,
    //     password: string
    // }
    error: string,
    phoneNumber: string,
    password: string,
}

class Login extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            phoneNumber: '',
            password: '',
        }

        // this.onSubmit = this.onSubmit.bind(this);
        // this.onSuccess = this.onSuccess.bind(this);
        // this.onError = this.onError.bind(this);
    }

    onForgotPassword = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('PasswordRecoverInit');
    }

    goToRegister = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('RegisterInit');
    }

    onSubmit = () => {
        this.setState({ error: '' }); //clear out error messages
        Toast.hide();

        const { phoneNumber, password } = this.state;
        const { login } = this.props;
        login({ phoneNumber, password }, this.onSuccess, this.onError);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('RouterLogged');
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
        return (
            <Container>
                <Content 
                    padder={false}
                    scrollEnabled={false}
                    // contentContainerStyle={{
                    //     flex: 1,
                    //     flexDirection: 'column',
                    //     justifyContent: 'center'
                    // }}
                >
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Image style={{ height: 200, width: 200 }} resizeMode='cover' source={require('../../../../../assets/driver.png')}/>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>+598</Text>
                            <Input 
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                value={this.state.phoneNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                textContentType="password" 
                                secureTextEntry={true} 
                                placeholder="Contraseña"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View>
                            <Text onPress={this.onForgotPassword}>Has olvidado la contraseña?</Text>
                        </View>
                        <Item style={{ marginVertical: 10 }}>
                            <Button style={{ flex: 1, flexDirection: 'center', paddingVertical: 10 }}
                                onPress={this.onSubmit}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    Iniciar Sesión
                                </Text>
                            </Button>
                        </Item>
                    </Form>

                    <View>
                        <Text onPress={this.goToRegister}>No tienes una cuenta? Crear cuenta</Text>
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

export default connect(mapStateToProps, { login })(Login);
