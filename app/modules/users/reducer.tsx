import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

type Vehicle = {
    vehicleId: number,
    model: string,
    registration: string,
    enable: boolean,
}

let vehicles: Vehicle[] = [];

let initialState = { 
    user: {
        userId: 0,
        mobileNumber: '',
        name: null,
        lastName: null,
        pushNotificationId: '',
        userType: ''
    },
    paymentMethods: [],
    vehicles,
    isLoading: false
};

const ordersReducer = (state = initialState, action) => {
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

        case t.GET_VEHICLES: {
            const { vehicles } = action.data;

            return { ...state, vehicles };
        }

        case t.GET_VEHICLES_BY_TYPE: {
            const { vehicles } = action.data;
            const oldVehicleState = state.vehicles;

            const vehiclesWithOutNews = oldVehicleState.filter(oldVehicle => !vehicles.some(newVehicle => newVehicle.vehicleId === oldVehicle.vehicleId));

            return { 
                ...state, 
                vehicles: vehiclesWithOutNews.concat(vehicles) 
            };
        }

        default:
            return state;
    }
};

export default ordersReducer;