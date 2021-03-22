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

// export const changeOriginAddressCoords = (originAddressCoords) => {
//     return (dispatch) => {
//         dispatch({type: t.CHANGE_ORIGIN_ADDRESS_COORDS, data: { originAddressCoords }});
//     };
// }

export const setOrderDestinationAddress = (destinationAddress, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_DESTINATION_ADDRESS, data: { destinationAddress }});
        successCB();
    };
}

// export const changeDestinationAddressCoords = (destinationAddressCoords) => {
//     return (dispatch) => {
//         dispatch({type: t.CHANGE_DESTINATION_ADDRESS_COORDS, data: { destinationAddressCoords }});
//     };
// }

export const addOrderDate = (date) => {
    return (dispatch) => {
        dispatch({type: t.ADD_ORDER_DATE, data: { date }});
    };
}
export const addOrderVehicleType = (vehicleType) => {
    return (dispatch) => {
        dispatch({type: t.ADD_ORDER_VEHICLE_TYPE, data: { vehicleType }});
    };
}
export const addOrderExtraOptions = (extraOptions) => {
    return (dispatch) => {
        dispatch({type: t.ADD_ORDER_EXTRA, data: { extraOptions }});
    };
}
export const addOrderPaymentMethid = (paymentMethod) => {
    return (dispatch) => {
        dispatch({type: t.ADD_ORDER_PAYMENT_METHOD, data: { paymentMethod }});
    };
}