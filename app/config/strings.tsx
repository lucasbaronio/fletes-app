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
