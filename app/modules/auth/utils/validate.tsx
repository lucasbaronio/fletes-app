export const isNotEmpty = (str, onError) => {
    if (!str || 0 === str.length) {
        onError();
        return false;
    }
    return true;
}

export const isOnlyNumbers = (str, onError) => {
    const numbers = /^[0-9]+$/;
    if (!str.match(numbers)) {
        onError();
        return false;
    }
    return true;
}

export const validateEmail = (email, onError) => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        onError();
        return false;
    }
    return true;
}

export const validateMobileNumber = (mobileNumber, onError) => {
    if (!mobileNumber.match(/^\d{8}$/)) {
        onError();
        return false;
    }
    return true;
}

export const validatePassword = (password, onError) => {
    if (password.length < 8) {
        onError();
        return false;
    }
    return true;
}

export const confirmPassword = (c_password, password, onError) => {
    if (c_password !== password) {
        onError();
        return false;
    }
    return true;
}

export const validate = (form) => {
    let error = {};
    let success = true;

    var keys = Object.keys(form);
    var length = keys.length;

    keys.slice(0, length).map(field => {
        if (field !== "error"){
            var { type, value } = form[field];
            if (isEmpty(value)){
                error[field] = 'Este campo es requerido';
                success = false;
            }else{
                error[field] = '';

                if (type === "email" && !validateEmail(value)) {
                    error[field] = 'Ingrese un mail válido';
                    success = false;
                }else if (type === "password" && !validatePassword(value)) {
                    error[field] = 'La contraseña debe tener más de 6 caracteres';
                    success = false;
                }else if (type === "confirm_password" && !confirmPassword(value, form["password"]['value'])) {
                    error[field] = 'Las contraseñas no coinciden';
                    success = false;
                }
            }
        }
    });

    return {success, error};
}