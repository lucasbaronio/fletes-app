// import { AsyncStorage } from 'react-native';
import { statusOrder } from '../../config/utils';
import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    isLoading: false,
    orderSelected: {
        orderId: 0,
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
        status: statusOrder.PENDING,
        vehicleType: {
            vehicleTypeId: 0,
            capacity: 0,
            pricePerHour: 0,
            open: false,
        },
        vehicle: {
            vehicleId: 0,
            model: '',
            registration: '',
            enabled: false,
            vehicleType: {
                vehicleTypeId: 0,
                capacity: 0,
                pricePerHour: 0,
                open: false,
            }
        },
        user: {

        },
        shipper: {

        },
        extraOptions: [],
        // paymentMethodId: null,
    },
    pendingOrders: [],
    activeOrders: [],
};

const shipperOrdersReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }
        
        case t.ORDER_SELECTED: {
            const { order } = action.data;

            return { ...state, orderSelected: order };
        }

        // case t.ORDER_DESTINATION_ADDRESS: {
        //     const { destinationAddress } = action.data;

        //     return { ...state, createOrder: { ...state.createOrder, destinationAddress } };
        // }

        // case t.GET_ORDER_INFO: {
        //     const { vehicleTypes, extraOptions } = action.data;

        //     return { ...state, orderInfo: { vehicleTypes, extraOptions } };
        // }

        // case t.ORDER_DATE: {
        //     const { originAt } = action.data;
        //     console.log(originAt);

        //     return { ...state, createOrder: { ...state.createOrder, originAt } };
        // }

        // case t.ORDER_VEHICLE_TYPE: {
        //     const { vehicleType } = action.data;

        //     return { ...state, createOrder: { ...state.createOrder, vehicleTypeId: vehicleType.vehicleTypeId } };
        // }

        // case t.ORDER_EXTRA: {
        //     const { extraOptions } = action.data;

        //     return { ...state, createOrder: { ...state.createOrder, extraOptions } };
        // }

        // case t.ORDER_PAYMENT_METHOD: {
        //     const { paymentMethod } = action.data;

        //     return { ...state, createOrder: { ...state.createOrder, paymentMethodId: paymentMethod.id } };
        // }

        default:
            return state;
    }
};

export default shipperOrdersReducer;