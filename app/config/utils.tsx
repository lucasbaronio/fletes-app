import { displayDate } from "../modules/orders/utils/utils";

export enum userTypes {
    USER = 'USER',
    SHIPPER = 'SHIPPER',
}

export enum extraOptionPriceTypes {
    FIXED = 'FIXED',
    DYNAMIC = 'DYNAMIC',
}

export enum statusOrder {
    COMPLETED = 'COMPLETED',
    COMPLETE_PENDING = 'COMPLETE_PENDING',
    TO_DESTINATION = 'TO_DESTINATION',
    AT_DESTINATION = 'AT_DESTINATION',
    TO_ORIGIN = 'TO_ORIGIN',
    AT_ORIGIN = 'AT_ORIGIN',
    ACCEPTED = 'ACCEPTED',
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
}

const orderStatusKeyValue = [{
    text: 'Cancelado',
    value: statusOrder.CANCELED,
    index: -1,
    textButtonShipper: [],
    textButtonUser: [],
    successText: 'El pedido fue cancelado.',
    currentTitleTime: order => order.userCompletedAt ? 'Hora que el usuario canceló el pedido' : 'Hora que el transportista canceló el pedido',
    currentValueTime: order => order.userCompletedAt ? displayDate(order.userCompletedAt) : displayDate(order.shipperCompletedAt),
},{
    text: 'En espera por transportista',
    value: statusOrder.PENDING,
    index: 0,
    textButtonShipper: ['Aceptar pedido'],
    textButtonUser: ['Cancelar Pedido'],
    successText: 'El pedido fue creado, esperando por algún transportista.',
    currentTitleTime: _ => 'Hora programada del transportista en el punto de origen',
    currentValueTime: order => displayDate(order.originAt),
},{
    text: 'Aceptado por un transportista',
    value: statusOrder.ACCEPTED,
    index: 1,
    textButtonShipper: ['Saliendo a punto de origen', 'Cancelar Pedido'],
    textButtonUser: ['Cancelar Pedido'],
    successText: 'El pedido fue aceptado, recuerda seleccionar el botón "Saliendo a punto de origen" cuando así sea.',
    currentTitleTime: _ => 'Hora programada del transportista en el punto de origen',
    currentValueTime: order => displayDate(order.originAt),
},{
    text: 'Transportista yendo hacia origen',
    value: statusOrder.TO_ORIGIN,
    index: 2,
    textButtonShipper: ['En el punto de origen'],
    textButtonUser: [],
    successText: 'El usuario fue notificado de que estas camino al origen, avísale cuando estés en el lugar.',
    currentTitleTime: order => order.shipperArrivesAtOriginAt ? 'Hora estimada del transportista en el punto de origen' : 'Hora programada del transportista en el punto de origen',
    currentValueTime: order => order.shipperArrivesAtOriginAt ? displayDate(order.shipperArrivesAtOriginAt) : displayDate(order.originAt),
},{
    text: 'Transportista en punto de origen',
    value: statusOrder.AT_ORIGIN,
    index: 3,
    textButtonShipper: ['Saliendo a punto de destino'],
    textButtonUser: [],
    successText: 'El usuario fue notificado de que estás en el origen, te recibirá a la brevedad.',
    currentTitleTime: _ => 'Hora que llegó el transportista al punto de origen',
    currentValueTime: order => displayDate(order.shipperArrivedAtOriginAt),
},{
    text: 'Transportista yendo hacia destino',
    value: statusOrder.TO_DESTINATION,
    index: 4,
    textButtonShipper: ['En el punto de destino'],
    textButtonUser: [],
    successText: 'El usuario fue notificado de que estás yendo hacia el destino.',
    currentTitleTime: _ => 'Hora estimada del transportista en el punto de destino',
    currentValueTime: order => order.shipperArrivesAtDestinationAt ? displayDate(order.shipperArrivesAtDestinationAt) : 'No se indicó hora estimada',
},{
    text: 'Transportista en punto de destino',
    value: statusOrder.AT_DESTINATION,
    index: 5,
    textButtonShipper: ['Finalizar Pedido'],
    textButtonUser: [],
    successText: 'El usuario fue notificado de que estás en el destino, al concluir la descarga, finaliza el pedido.',
    currentTitleTime: _ => 'Hora que llegó el transportista al punto de destino',
    currentValueTime: order => displayDate(order.shipperArrivedAtDestinationAt),
},{
    text: 'Transportista finalizó el pedido',
    value: statusOrder.COMPLETE_PENDING,
    index: 6,
    textButtonShipper: [],
    textButtonUser: ['Finalizar Pedido'],
    successText: 'El usuario fue notificado de que finalizaste el pedido, en breve recibiras la confirmación.',
    currentTitleTime: _ => 'Hora que el transportista finalizó el pedido',
    currentValueTime: order => displayDate(order.shipperCompletedAt),
},{
    text: 'Pedido finalizado',
    value: statusOrder.COMPLETED,
    index: 7,
    textButtonShipper: [],
    textButtonUser: [],
    successText: 'El pedido fue finalizado, esperemos que no haya tenido inconvenientes con el mismo.',
    currentTitleTime: _ => 'Hora que se completó el pedido',
    currentValueTime: order => displayDate(order.userCompletedAt),
},];

export const getOrderStatusText = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.text : null;
}

export const getOrderStatusValue = (statusText) => {
    const item = orderStatusKeyValue.find(item => item.text == statusText);
    return item ? item.value : null;
}

export const getOrderStatusIndex = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.index : 99;
}

export const getOrderStatusTextButtonShipper = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.textButtonShipper : [];
}

export const getOrderStatusTextButtonUser = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.textButtonUser : [];
}

export const getOrderStatusSuccessText = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.successText : '';
}

export const isShipperUser = (userType) => {
    return userType === userTypes.SHIPPER;
}

export const getOrderStatusCurrentTime = (order) => {
    const item = orderStatusKeyValue.find(item => item.value == order.status);
    return item ? {
        title: item.currentTitleTime(order),
        value: item.currentValueTime(order),
    } : {
        title: '',
        value: '',
    };
}