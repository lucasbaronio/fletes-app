import * as SecureStore from 'expo-secure-store';

export const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

export const saveMany = async (keyValues) => {
    keyValues.map(async obj => {
        const { key, value } = obj;
        await SecureStore.setItemAsync(key, value);
    })
}
  
export const getValue = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        // alert("🔐 Here's your value 🔐 \n" + result);
        return result;
    } else {
        // alert('No values stored under that key.');
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