export const ERROR_EMPTY = 'No se ha ingresado ';
export const ERROR_EMPTY_MOBILE_NUMBER = `${ERROR_EMPTY}el número de celular`;
export const ERROR_EMPTY_PASSWORD = `${ERROR_EMPTY}la contraseña`;
export const ERROR_EMPTY_CODE = () => `${ERROR_EMPTY}el código que recibió por SMS`;

export const ERROR_INCORRECT = ' que ingresó, no es correcto';
export const ERROR_INCORRECT_MOBILE_NUMBER = `El número de celular${ERROR_INCORRECT}`;
export const ERROR_INCORRECT_PASSWORD = `La contraseña${ERROR_INCORRECT}`;
export const ERROR_INCORRECT_CODE = () => `El código que recibió por SMS ${ERROR_INCORRECT}`;

export const ERROR_PASSWORD_DIFF = 'Las contraseñas no son iguales';
export const ERROR_PASSWORD_LENGTH = 'La contraseña debe contener al menos 8 caracteres';

export const ERROR_EMPTY_STREET_NAME_ORIGIN = 'Debe ingresar el nombre de la calle de recogida';
export const ERROR_EMPTY_STREET_NUMBER_ORIGIN = 'Debe ingresar el número del domicilio de recogida';
export const ERROR_EMPTY_STREET_NAME_DESTINATION = 'Debe ingresar el nombre de la calle de destino';
export const ERROR_EMPTY_STREET_NUMBER_DESTINATION = 'Debe ingresar el número del domicilio de destino';

export const ORDERS_SCENES_MAP_ADDRESS_TITLE = 'Por favor, arrastre los marcadores según el lugar de inicio (rojo) y destino (azul) del pedido.';
export const ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION = 'Se necesitan permisos de ubicacion para poder utilizar la aplicación';
export const ORDERS_SCENES_MAP_ADDRESS_ERROR_LOCATION_IOS = 'Se necesita que los permisos de ubicación sean del tipo "Siempre" para el correcto funcionamiento de la app';
export const ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_1 = 'Complete los datos con las direcciones que seleccionó en el mapa:';
export const ORDERS_SCENES_MAP_ADDRESS_SLIDINGPANEL_TITLE_2 = 'Y a continuación levante este panel hacia arriba.';

export const ORDERS_SLIDING_VEHICLE_TYPE_TITLE_1 = 'Capacidad de carga:';
export const ORDERS_SLIDING_VEHICLE_TYPE_TITLE_2 = 'Caja Abierta/Cerrada:';
export const ORDERS_SLIDING_VEHICLE_TYPE_TITLE_3 = 'Opciones Extra:';