// import { AsyncStorage } from 'react-native';
import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    createOrder: {
        originAddress: {
            streetName: '',
            streetNumber: '',
            doorNumber: '',
            coords: {
                latitude: null,
                longitude: null,
            }
        },
        destinationAdderss: {
            streetName: '',
            streetNumber: '',
            doorNumber: '',
            coords: {
                latitude: null,
                longitude: null,
            }
        },
        date: null,
        vehicleTypeId: null,
        extraOptions: [],
        paymentMethodId: null,
    },
    orderInfo: {
        vehicleTypes: [],
        extraOptions: []
    }
};

const ordersReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(state);
    switch (action.type) {
        case t.ORDER_ORIGIN_ADDRESS: {
            const { originAddress } = action.data;

            return { ...state, createOrder: { ...state.createOrder, originAddress } };
        }

        // case t.CHANGE_ORIGIN_ADDRESS: {
        //     const { originAddress } = action.data;

        //     return { ...state, originAddress };
        // }

        case t.ORDER_DESTINATION_ADDRESS: {
            const { destinationAddress } = action.data;

            return { ...state, createOrder: { ...state.createOrder, destinationAddress } };
        }

        // case t.CHANGE_DESTINATION_ADDRESS_COORDS: {
        //     const { destinationAddressCoords } = action.data;

        //     return { ...state, destinationAddressCoords };
        // }

        case t.GET_ORDER_INFO: {
            const { vehicleTypes, extraOptions } = action.data;

            return { ...state, orderInfo: { vehicleTypes, extraOptions } };
        }

        case t.ADD_ORDER_DATE: {
            const { date } = action.data;

            return { ...state, createOrder: { ...state.createOrder, date } };
        }

        case t.ADD_ORDER_VEHICLE_TYPE: {
            const { vehicleType } = action.data;

            return { ...state, createOrder: { ...state.createOrder, vehicleTypeId: vehicleType.vehicleTypeId } };
        }

        case t.ADD_ORDER_EXTRA: {
            const { extraOptions } = action.data;

            return { ...state, createOrder: { ...state.createOrder, extraOptions } };
        }

        case t.ADD_ORDER_PAYMENT_METHOD: {
            const { paymentMethod } = action.data;

            return { ...state, createOrder: { ...state.createOrder, paymentMethod } };
        }

        default:
            return state;
    }
};

export default ordersReducer;