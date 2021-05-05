import * as t from './actionTypes';
import * as tAuth from '../auth/actionTypes';
import * as api from './api';

export const createPaymentMethod = (paymentMethod, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.createPaymentMethod(paymentMethod, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.CREATE_PAYMENT_METHOD, data});
                successCB(data);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const getPaymentMethod = (successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getPaymentMethod((isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.GET_PAYMENT_METHODS, data});
                successCB(data);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const getVehicles = (successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getVehicles((isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.GET_VEHICLES, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const getVehiclesByType = (vehicleTypeId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getVehiclesByType(vehicleTypeId, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                console.log(data);
                dispatch({type: t.GET_VEHICLES_BY_TYPE, data});
                successCB(data.vehicles);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}
