import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';

import { actions as users } from "../../../users/index";
const { getVehiclesByType } = users;

import { actions as shipperOrders } from "../../index";
const { setVehicleSelected } = shipperOrders;

import styles from './styles';
import { FlatGrid } from 'react-native-super-grid';
// import SlidingPanelVehicleType from '../../components/SlidingPanelVehicleType';

type MyProps = {
    getVehiclesByType: (vehicleTypeId, onSuccess, onError) => void,
    setVehicleSelected: (vehicle, onSuccess) => void,
    route: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
    vehicles: any,
}
class VehicleSelect extends React.Component<MyProps, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
            vehicles: [],
        };
    }

    componentDidMount() {
        const { getVehiclesByType, route } = this.props;
        const { vehicleTypeId } = route.params;
        getVehiclesByType(vehicleTypeId, this.onSuccess, this.onError);
    }

    onSuccess = (vehicles) => {
        console.log(vehicles);
        this.setState({ error: '', visibleModal: false, vehicles });
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onSelectVehicle = (item) => {
        const { setVehicleSelected, navigation } = this.props;
        setVehicleSelected(item, () => {
            navigation.pop();
        });
    }

    render() {
        const { vehicles } = this.state;
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatGrid
                    // keyExtractor={(item, rowItemIndex) => rowItemIndex.toString()}
                    keyExtractor={item => item.vehicleId}
                    itemDimension={130}
                    data={vehicles}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => this.onSelectVehicle(item)}
                            style={styles.itemContainer}>
                            <Image 
                                style={styles.itemImage} 
                                resizeMode='contain'
                                source={require('../../../../../assets/vehicleType_grande.jpeg')} />
                            <Text style={styles.itemModel}>{item.model}</Text>
                            <Text style={styles.itemRegistration}>{item.registration}</Text>
                        </TouchableOpacity>
                    )}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.shipperOrdersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { getVehiclesByType, setVehicleSelected })(VehicleSelect);
