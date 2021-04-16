import {
    API_ORDER,
} from './constants';
import { get, post, deleteMethod } from '../globalApi';
import { getHeaderToken } from '../security';

export const getOrder = async (orderId, callback) => {
    const header = await getHeaderToken();
    get(API_ORDER(orderId), header, callback);
}

// export const createOrder = async (createOrder, callback) => {
//     const header = await getHeaderToken();
//     post(API_ORDERS, createOrder, header, callback)
// }