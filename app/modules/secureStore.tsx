import * as SecureStore from 'expo-secure-store';

export const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value.toString());
}

export const saveMany = async (keyValues) => {
    keyValues.map(async obj => {
        const { key, value } = obj;
        console.log("SecureStore", key, value);
        await SecureStore.setItemAsync(key, value ? value.toString() : "");
    })
}

export const getValue = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        // alert("🔐 Here's your value 🔐 \n" + result);
        console.log("🔐 Here's your value 🔐 \n" + result);
        return result;
    } else {
        // alert('No values stored under that key.');
        console.log('No values stored under ', key);
        return '';
    }
}

export const deleteValue = async (key) => {
    await SecureStore.deleteItemAsync(key);
}

export const deleteMany = async (keys) => {
    keys.map(async key => {
        await SecureStore.deleteItemAsync(key);
    })
}