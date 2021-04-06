// import { AsyncStorage } from 'react-native';
import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    user: null,
    paymentMethods: [],
    isLoading: false
};

const ordersReducer = (state = initialState, action) => {
    // console.log(action.type);
    // console.log(state);
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }

        case t.CREATE_PAYMENT_METHOD: {
            const { paymentMethod } = action.data;
            let paymentMethods = state.paymentMethods;

            return { ...state, paymentMethods: paymentMethods.concat(paymentMethod) };
        }

        case t.GET_PAYMENT_METHODS: {
            const { paymentMethods } = action.data;

            return { ...state, paymentMethods };
        }

        default:
            return state;
    }
};

export default ordersReducer;