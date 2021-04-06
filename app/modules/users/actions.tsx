import * as t from './actionTypes';
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
            else if (error) errorCB(error)
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
            else if (error) errorCB(error)
        });
    };
}