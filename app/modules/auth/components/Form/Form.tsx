import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, Button} from 'react-native';
// import {Button} from 'react-native-elements'

import {isEmpty, validate} from '../../utils/validate'

import styles from "./styles"

// import AuthTextInput from "../AuthTextInput"

type MyProps = {
    onSubmit: (retData) => void,
    fields: [{key, type, value}],
    showLabel: string,
    buttonTitle: string,
    onForgotPassword: () => void,
    isLoading: boolean
}
type MyState = {
    error: {}
}

class Form extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);

        const { fields, error } = props;

        this.state = this.createState(fields, error);

        //bind functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createState(fields, error) {
        //create the state
        const state = {};
        fields.forEach((field) => {
            let {key, type, value} = field;
            state[key] = {type: type, value: value};
        })

        state["error"] = error;
        return state;
    }

    onSubmit() {
        const data = this.state;
        const result = validate(data);

        if (!result.success) this.setState({error: result.error});
        else this.props.onSubmit(this.extractData(data));
    }

    extractData(data) {
        const retData = {};

        Object.keys(data).forEach(function (key) {
            if (key !== "error") {
                let {value} = data[key];
                retData[key] = value;
            }
        });

        return retData;
    }

    onChange(key, text) {
        const state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    }

    render() {
        const { fields, showLabel, buttonTitle, onForgotPassword, isLoading } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {
                        (!isEmpty(this.state.error['general'])) &&
                        <Text style={styles.errorText}>{this.state.error['general']}</Text>
                    }

                    {
                        fields.map((data, idx) => {
                            let {key, label, placeholder, autoFocus, secureTextEntry, keyboardType, returnKeyType} = data;
                            return (
                                // <AuthTextInput key={key}
                                //                label={label}
                                //                showLabel={showLabel}
                                //                placeholder={placeholder}
                                //                autoFocus={autoFocus}
                                //                onChangeText={(text) => this.onChange(key, text)}
                                //                secureTextEntry={secureTextEntry}
                                //                keyboardType={keyboardType}
                                //                returnKeyType={returnKeyType}
                                //                value={this.state[key]['value']}
                                //                error={this.state.error[key]}/>
                                <Text key={key}>
                                    Holaaa
                                </Text>
                            )
                        })
                    }

                    {/* <Button
                        raised
                        loading={isLoading}
                        disabled={isLoading}
                        disabledStyle={styles.button}
                        title={isLoading ? "" : buttonTitle}
                        borderRadius={0}
                        containerViewStyle={styles.containerView}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.onSubmit}/> */}

                    <Button
                        onPress={this.onSubmit}
                        title={isLoading ? "" : buttonTitle}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    {
                        this.props.onForgotPassword !== null &&
                        <Text style={styles.forgotText} onPress={onForgotPassword}>
                            Olvidaste la contraseña?</Text>
                    }

                </View>
            </View>
        );
    }
}

Form.propTypes = {
    // fields: PropTypes.object,
    showLabel: PropTypes.bool,
    buttonTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}

Form.defaultProps = {
    onForgotPassword: null,
}

export default Form;