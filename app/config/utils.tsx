import moment from "moment";
import 'moment/min/locales';
import * as Localization from 'expo-localization';

const orderStatusKeyValue = [{
    text: 'Cancelado',
    value: 'CANCELED'
},{
    text: 'En espera por transportista',
    value: 'PENDING'
},{
    text: 'Aceptado por un transportista',
    value: 'ACCEPTED'
},{
    text: 'Transportista yendo hacia origen',
    value: 'TO_ORIGIN'
},{
    text: 'Transportista yendo hacia destino',
    value: 'TO_DESTINATION'
},{
    text: 'Pedido finalizado',
    value: 'COMPLETED'
},];

export const getOrderStatusText = (statusValue) => {
    const item = orderStatusKeyValue.find(item => item.value == statusValue);
    return item ? item.text : null;
}

export const getOrderStatusValue = (statusText) => {
    const item = orderStatusKeyValue.find(item => item.text == statusText);
    return item ? item.value : null;
}

