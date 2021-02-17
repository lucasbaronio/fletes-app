import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index"
const { register } = auth;

import styles from './styles';

const error = {
    general: "",
    email: "",
    fullName: "",
    username: "",
    password: "",
    confirm_password: ""
}

type MyProps = {
    register: (data, onSuccess, onError) => void,
}
type MyState = {
    error: {
        general: string,
        email: string,
        password: string
    }
}

class Register extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        // Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
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
                            <Input keyboardType="phone-pad" placeholder="Nro. celular"/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item style={{ marginVertical: 10 }}>
                            <Button style={{ flex: 1, flexDirection: 'center', paddingVertical: 10 }}
                                onPress={() =>
                                    Toast.show({
                                        text: "Wrong password!",
                                        buttonText: "Okay",
                                        buttonTextStyle: { color: "#008000" },
                                        buttonStyle: { backgroundColor: "#5cb85c" },
                                        duration: 999999
                                      })}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    Crear cuenta
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

export default connect(mapStateToProps, { register })(Register);
