import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderVehicleType, setOrderExtraOptions } = orders;

import styles from './styles';
import { showToast, showToastLoading } from '../../../../components/Toast';
import { FlatGrid } from 'react-native-super-grid';
import SlidingPanelVehicleType from '../../components/SlidingPanelVehicleType';

type MyProps = {
    setOrderVehicleType: (vehicleType) => void,
    setOrderExtraOptions: (extraOptionsIds) => void,
    vehicleTypes: any,
    extraOptions: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    isLoading: boolean,
    vehicleTypeSelected: {
        name: string,
        open: boolean,
        pricePerHour: number,
        vehicleTypeId: number,
    },
    showSlidingPanel: boolean
}
class VehicleTypesGrid extends React.Component<MyProps, MyState> {
    map: any;
    slidingPanelVehicleType: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            // @ts-ignore
            vehicleTypeSelected: null,
            showSlidingPanel: false,
        };
    }

    onNextScreen = (vehicleType, extraOptionsSelected) => {
        const { navigation, setOrderVehicleType, setOrderExtraOptions } = this.props;
        setOrderVehicleType(vehicleType);
        const extraOptions = this.getExtraOptionsId(extraOptionsSelected);
        setOrderExtraOptions(extraOptions);
        // navigation.navigate('MapAddressDestination');
    }

    getExtraOptionsId = (extraOptionsSelected) => {
        const extraOptionsIds = new Array();
        extraOptionsSelected.forEach((item) => {
            if (item.selected) {
                extraOptionsIds.push(item.orderAvailableExtraOptionId)
            }
        });
        return extraOptionsIds;
    }

    // onSuccess = () => {
    //     const { navigation } = this.props;
    //     // navigation.navigate('MapAddressDestination');
    // }

    // onError = (error) => {
    //     this.setState({ error });
    //     showToast(this.state.error);
    // }

    render() {
        const { vehicleTypes, extraOptions } = this.props;

        return (
            <View style={styles.container}>
                <FlatGrid
                    itemDimension={130}
                    data={vehicleTypes}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => { this.slidingPanelVehicleType(item) }}
                            style={[styles.itemContainer, { backgroundColor: 'white' }]}>
                            <Image 
                                style={{ width: 150, height: 90 }} 
                                resizeMode='contain'
                                source={item.name == 'chico' ?
                                    require('../../../../../assets/vehicleType_chico.jpeg')
                                    :item.name == 'mediano' ?
                                    require('../../../../../assets/vehicleType_mediano.jpeg')
                                    :require('../../../../../assets/vehicleType_grande.jpeg')} />
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>$ {item.pricePerHour} por hora</Text>
                        </TouchableOpacity>
                    )}
                    />
                
                <SlidingPanelVehicleType 
                    // ref="slidingPanelVehicleType"
                    forwardRef={c => { this.slidingPanelVehicleType = c }}
                    // vehicleType={vehicleTypeSelected}
                    extraOptions={extraOptions}
                    onNextScreen={this.onNextScreen}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        vehicleTypes: state.ordersReducer.orderInfo.vehicleTypes,
        extraOptions: state.ordersReducer.orderInfo.extraOptions,
    }
}

export default connect(mapStateToProps, { setOrderVehicleType, setOrderExtraOptions })(VehicleTypesGrid);
