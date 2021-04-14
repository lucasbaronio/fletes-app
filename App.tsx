import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import * as SplashScreen from 'expo-splash-screen';

import RouterApp from './app/config/routes/routes';
import store from './app/redux/store';

// function cacheFonts(fonts) {
//     return fonts.map(font => Font.loadAsync(font));
// }

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default class App extends Component {
    state = {
        isReady: false,
    };

    async _cacheResourcesAsync(): Promise<void> {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });

        const images = [require('./assets/driver.png')];
    
        const cacheImages = images.map(image => {
          return Asset.fromModule(image).downloadAsync();
        });
        Promise.all(cacheImages);
        await SplashScreen.hideAsync();
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
    
        return (
            <Provider store={store}>
                <Root>
                    <RouterApp/>
                </Root>
            </Provider>
        );
    }
}