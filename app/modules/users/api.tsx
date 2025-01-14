import {
    API_USERS_PAYMENT_METHOD,
    API_VEHICLES,
    API_VEHICLES_BY_TYPE,
} from './constants';
import { get, post, deleteMethod } from '../globalApi';
import { getHeaderToken } from '../security';

// import { getUserById } from '../profile/api';
// export { getUserById }

export const createPaymentMethod = async (paymentMethod, callback) => {
    const header = await getHeaderToken();
    // post(API_USERS_PAYMENT_METHOD, paymentMethod, header, callback);
    const data = {
        data: {
            ...paymentMethod,
            id: Math.floor(Math.random() * (300000 - 200000) ) + 200000,
            finalNumbers: Math.floor(Math.random() * (9999 - 1000) ) + 1000,
            default: false,
        }
    }
    callback && callback(true, data, null);
}

export const getPaymentMethod = async (callback) => {
    const header = await getHeaderToken();
    // get(API_USERS_PAYMENT_METHOD, header, callback);
    const data = {
        data: {
            paymentMethods: [
                {
                    id: 100001,
                    type: 'cash',
                    text: 'Efectivo',
                    default: true,
                },
                // {
                //     id: 100001,
                //     finalNumbers: 4321,
                //     exp: '01/22',
                //     default: false,
                // },
                // {
                //     id: 100001,
                //     finalNumbers: 6789,
                //     exp: '09/24',
                //     default: false,
                // }
            ]
        }
    }
    callback && callback(true, data, null);
}

export const getVehicles = async (callback) => {
    const header = await getHeaderToken();
    get(API_VEHICLES, header, callback);
}

export const getVehiclesByType = async (vehicleTypeId, callback) => {
    const header = await getHeaderToken();
    get(API_VEHICLES_BY_TYPE(vehicleTypeId), header, callback);
}


