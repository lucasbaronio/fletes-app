import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from '../modules/Map';
import { isLargeScreen } from "../styles/theme";

const Drawer = createDrawerNavigator();

export default class RouterLogged extends Component {
    render() {
        return (
            <Drawer.Navigator 
                initialRouteName="Home"
                // openByDefault
                drawerType={isLargeScreen ? 'permanent' : 'back'}
                drawerStyle={isLargeScreen ? null : { width: '80%' }}
                // overlayColor="transparent"
            >
                <Drawer.Screen 
                name="Home" 
                component={Map} 
                options={{ 
                    title: 'Mapa', 
                    headerShown: true,
                    headerStyle: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    },
                    headerTitle: "",
                }} />
                <Drawer.Screen 
                name="Details" 
                component={DetailsScreen} 
                options={{
                    headerShown: true,
                }} />
            </Drawer.Navigator>
        )
    }
}

function DetailsScreen() {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
});
