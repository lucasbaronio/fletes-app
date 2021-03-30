import { deleteMany } from '../secureStore';
import * as t from './actionTypes';
import * as api from './api';

// import { AsyncStorage } from "react-native";

export const setOrderOriginAddress = (originAddress, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_ORIGIN_ADDRESS, data: { originAddress }});
        successCB();
    };
}

export const setOrderDestinationAddress = (destinationAddress, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_DESTINATION_ADDRESS, data: { destinationAddress }});
        successCB();
    };
}

export const getOrdersInfo = (successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getOrdersInfo((isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.GET_ORDER_INFO, data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export const setOrderDate = (date) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_DATE, data: { date }});
    };
}

export const setOrderVehicleType = (vehicleType) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_VEHICLE_TYPE, data: { vehicleType }});
    };
}

export const setOrderExtraOptions = (extraOptions) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_EXTRA, data: { extraOptions }});
    };
}

export const addOrderPaymentMethid = (paymentMethod) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_PAYMENT_METHOD, data: { paymentMethod }});
    };
}