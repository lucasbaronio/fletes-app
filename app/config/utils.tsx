
export enum userTypes {
    USER = 'USER',
    SHIPPER = 'SHIPPER',
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
},{
    text: 'En espera por transportista',
    value: statusOrder.PENDING,
    index: 0,
    textButtonShipper: ['Aceptar pedido'],
    textButtonUser: ['Cancelar Pedido'],
},{
    text: 'Aceptado por un transportista',
    value: statusOrder.ACCEPTED,
    index: 1,
    // textButtonShipper: 'Saliendo a punto de origen',
    textButtonShipper: ['Saliendo a punto de origen', 'Cancelar Pedido'],
    textButtonUser: ['Cancelar Pedido'],
},{
    text: 'Transportista yendo hacia origen',
    value: statusOrder.TO_ORIGIN,
    index: 2,
    textButtonShipper: ['En el punto de origen'],
    textButtonUser: [],
},{
    text: 'Transportista en punto de origen',
    value: statusOrder.AT_ORIGIN,
    index: 3,
    textButtonShipper: ['Saliendo a punto de destino'],
    textButtonUser: [],
},{
    text: 'Transportista yendo hacia destino',
    value: statusOrder.TO_DESTINATION,
    index: 4,
    textButtonShipper: ['En el punto de destino'],
    textButtonUser: [],
},{
    text: 'Transportista en punto de destino',
    value: statusOrder.AT_DESTINATION,
    index: 5,
    textButtonShipper: ['Finalizar Pedido'],
    textButtonUser: [],
},{
    text: 'Transportista finalizó el pedido',
    value: statusOrder.COMPLETE_PENDING,
    index: 6,
    textButtonShipper: [],
    textButtonUser: ['Finalizar Pedido'],
},{
    text: 'Pedido finalizado',
    value: statusOrder.COMPLETED,
    index: 7,
    textButtonShipper: [],
    textButtonUser: [],
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

export const isShipperUser = (userType) => {
    return userType === userTypes.SHIPPER;
}