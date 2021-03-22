import React from 'react';
import { Image } from 'react-native';
import { AnimatedRegion, Marker } from 'react-native-maps';

type MyProps = {
    driver: any,
}
type MyState = {
    driver: any,
    coordinate: any,
}

class Driver extends React.Component<MyProps, MyState> {
    marker: any

    constructor(props) {
        super(props);

        const driver = this.props.driver ?
            this.props.driver :
            {
                uid: 'noDriverPassed',
                location: { latitude: 0, longitude: 0 },
            }
        
        const coordinate = new AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
        })

        this.state = {
            driver,
            coordinate,
        };
    }

    render() {
        return (
            // @ts-ignore
            <Marker.Animated 
                coordinate={this.state.coordinate}
                anchor={{ x: 0.35, y: 0.32}} // center car.png image
                ref={ marker => { this.marker = marker }}
                style={{ width: 50, height: 50 }} >
                
                <Image source={require('../../../../assets/driver.png')}
                    style={{ width: 32, height: 32 }} />
            </Marker.Animated>
        );
    }
}

export default Driver;
