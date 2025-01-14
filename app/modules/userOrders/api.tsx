import {
    API_ORDER,
    API_ORDER_CANCELED,
    API_ORDER_COMPLETED,
    API_ORDERS_ACTIVE,
    API_ORDERS_HISTORY,
} from './constants';
import { get, post, deleteMethod, patch } from '../globalApi';
import { getHeaderToken } from '../security';

export const getOrder = async (orderId, callback) => {
    const header = await getHeaderToken();
    get(API_ORDER(orderId), header, callback);
}

export const getActiveOrders = async (page, callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_ACTIVE(page), header, callback);
}

export const getHistoryOrdersUser = async (page, callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_HISTORY(page), header, callback);
}

export const orderStatusCanceled = async (orderId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_CANCELED(orderId), null, header, callback)
}

export const orderStatusCompleted = async (orderId, finalComments, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_COMPLETED(orderId), finalComments, header, callback)
}