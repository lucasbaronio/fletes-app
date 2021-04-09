// import { AsyncStorage } from 'react-native';
import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    isLoading: false,
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
        destinationAddress: {
            streetName: '',
            streetNumber: '',
            doorNumber: '',
            coords: {
                latitude: null,
                longitude: null,
            }
        },
        originAt: null,
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
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }
        
        case t.ORDER_ORIGIN_ADDRESS: {
            const { originAddress } = action.data;

            return { ...state, createOrder: { ...state.createOrder, originAddress } };
        }

        case t.ORDER_DESTINATION_ADDRESS: {
            const { destinationAddress } = action.data;

            return { ...state, createOrder: { ...state.createOrder, destinationAddress } };
        }

        case t.GET_ORDER_INFO: {
            const { vehicleTypes, extraOptions } = action.data;

            return { ...state, orderInfo: { vehicleTypes, extraOptions } };
        }

        case t.ORDER_DATE: {
            const { originAt } = action.data;
            console.log(originAt);

            return { ...state, createOrder: { ...state.createOrder, originAt } };
        }

        case t.ORDER_VEHICLE_TYPE: {
            const { vehicleType } = action.data;

            return { ...state, createOrder: { ...state.createOrder, vehicleTypeId: vehicleType.vehicleTypeId } };
        }

        case t.ORDER_EXTRA: {
            const { extraOptions } = action.data;

            return { ...state, createOrder: { ...state.createOrder, extraOptions } };
        }

        case t.ORDER_PAYMENT_METHOD: {
            const { paymentMethod } = action.data;

            return { ...state, createOrder: { ...state.createOrder, paymentMethodId: paymentMethod.id } };
        }

        default:
            return state;
    }
};

export default ordersReducer;