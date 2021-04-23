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
            type: {
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
    pendingOrders: [], // Pedidos que estan pendientes a ser aceptadas por el shipper 
    activeOrders: [], // Pedidos que ya fueron aceptados por el shipper y siguen activas
    historyOrders: [], // Pedidos que fueron aceptados por el shipper y que ya finalizaron (COMPLETED o CANCELED)
};

const shipperOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }
        
        case t.ORDER_SELECTED: {
            const { order } = action.data;

            return { ...state, orderSelected: order };
        }

        case t.ORDER: {
            const { order } = action.data;
            const { pendingOrders, activeOrders, historyOrders } = state;
            switch (order.status) {
                case statusOrder.PENDING:
                    return { 
                        ...state, 
                        orderSelected: order, 
                        pendingOrders: pendingOrders.concat(order),
                    };
                case statusOrder.CANCELED:
                    return { 
                        ...state, 
                        orderSelected: order, 
                        historyOrders: historyOrders.concat(order),
                    };
                case statusOrder.COMPLETED:
                    return { 
                        ...state, 
                        orderSelected: order, 
                        historyOrders: historyOrders.concat(order),
                    };
                default: // Active order
                    return { 
                        ...state, 
                        orderSelected: order, 
                        activeOrders: activeOrders.concat(order),
                    };
            }
        }

        case t.ORDER_ACCEPTED: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.ACCEPTED 
                } 
            };
        }

        case t.ORDER_TO_ORIGIN: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.TO_ORIGIN 
                } 
            };
        }

        case t.ORDER_AT_ORIGIN: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.AT_ORIGIN 
                } 
            };
        }

        case t.ORDER_TO_DESTINATION: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.TO_DESTINATION 
                } 
            };
        }

        case t.ORDER_AT_DESTINATION: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.AT_DESTINATION 
                } 
            };
        }

        case t.ORDER_COMPLETED: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.COMPLETE_PENDING 
                } 
            };
        }

        default:
            return state;
    }
};

export default shipperOrdersReducer;