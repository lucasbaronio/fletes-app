import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index"
const { registerInit } = auth;

type MyProps = {
    registerInit: (data, onSuccess, onError) => void,
    navigation: any,
}
type MyState = {
    error: string,
    mobileNumber: string,
}

class PasswordRecoverInit extends React.Component<MyProps, MyState> {
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
        this.setState({ error: '' }); //clear out error messages
        Toast.hide();

        const { mobileNumber } = this.state;
        const { registerInit } = this.props;
        registerInit({ mobileNumber }, this.onSuccess, this.onError);
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('PasswordRecover');
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
                    scrollEnabled={false}>
                    
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Image source={require('../../../../../assets/driver.png')}/>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>+598</Text>
                            <Input 
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item style={{ marginVertical: 10 }}>
                            <Button style={{ flex: 1, flexDirection: 'center', paddingVertical: 10 }}
                                onPress={this.onSubmit}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    Recuperar cuenta
                                </Text>
                            </Button>
                        </Item>
                    </Form>

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

export default connect(mapStateToProps, { registerInit })(PasswordRecoverInit);
