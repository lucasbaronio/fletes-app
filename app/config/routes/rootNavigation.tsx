import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    // @ts-ignore
    navigationRef.current?.navigate(name, params);
}

export function push(name, params) {
    // @ts-ignore
    navigationRef.current?.dispatch(StackActions.push(name, params));
}