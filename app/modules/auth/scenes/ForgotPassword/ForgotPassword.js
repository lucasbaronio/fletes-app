import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { resetPassword } = auth;

import Form from "../../components/Form"

const fields = [
    {
        key:'email',
        label: "Email Address",
        placeholder:"Dirección de correo electónico",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "email",
        returnKeyType: "done",
        keyboardType: "email-address"
    }
];

const error = {
    general: "",
    email: ""
}

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.resetPassword(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        alert("Se envio un mail para recuperar tu contraseña.")
        Actions.pop();
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
                <Form fields={fields}
                      onSubmit={this.onSubmit}
                      buttonTitle={"Recuperar contraseña"}
                      error={this.state.error}/>
        );
    }
}

export default connect(null, { resetPassword })(ForgotPassword);