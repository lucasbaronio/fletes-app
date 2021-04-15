
export enum userTypes {
    USER = 'USER',
    SHIPPER = 'SHIPPER',
}

export enum statusOrder {
    COMPLETED = 'COMPLETED',
    TO_DESTINATION = 'TO_DESTINATION',
    TO_ORIGIN = 'TO_ORIGIN',
    ACCEPTED = 'ACCEPTED',
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
}

const orderStatusKeyValue = [{
    text: 'Cancelado',
    value: statusOrder.CANCELED,
},{
    text: 'En espera por transportista',
    value: statusOrder.PENDING,
},{
    text: 'Aceptado por un transportista',
    value: statusOrder.ACCEPTED,
},{
    text: 'Transportista yendo hacia origen',
    value: statusOrder.TO_ORIGIN,
},{
    text: 'Transportista yendo hacia destino',
    value: statusOrder.TO_DESTINATION,
},{
    text: 'Pedido finalizado',
    value: statusOrder.COMPLETED,
},];

export const getOrderStatusText = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.text : null;
}

export const getOrderStatusValue = (statusText) => {
    const item = orderStatusKeyValue.find(item => item.text == statusText);
    return item ? item.value : null;
}

export const isShipperUser = (userType) => {
    return userType === userTypes.SHIPPER;
}