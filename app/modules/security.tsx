import { getValue } from './secureStore';

export const getToken = async () => {
    return await getValue('session_token');
}

export const getHeaderToken = async () => {
    const token = await getValue('session_token');
    if (token) {
        const header = {
            Authorization: `Bearer ${token}`
        }
        return header
    }
    return {}
}
