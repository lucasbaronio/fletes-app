import {
    API_ORDERS,
    API_ORDERS_INFO,
} from './constants';
import { get, post, deleteMethod } from '../globalApi';
import { getHeaderToken } from '../security';

export const getOrdersInfo = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_INFO, header, callback);
}

export const createOrder = async (createOrder, callback) => {
    const header = await getHeaderToken();
    post(API_ORDERS, createOrder, header, callback)
}