import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';

import { actions as orders } from "../../index";
const { setOrderVehicleType, setOrderExtraOptions } = orders;

import styles from './styles';
import { FlatGrid } from 'react-native-super-grid';
import SlidingPanelVehicleType from '../../components/SlidingPanelVehicleType';
import { API_VEHICLE_TYPE_IMAGE } from '../../../../config/constants';
import { getHeaderToken } from '../../../security';

const small = require('../../../../../assets/vehicleType_chico.jpeg');
const regular = require('../../../../../assets/vehicleType_mediano.jpeg');
const big = require('../../../../../assets/vehicleType_grande.jpeg');

type MyProps = {
    setOrderVehicleType: (vehicleType) => void,
    setOrderExtraOptions: (extraOptionsIds) => void,
    vehicleTypes: any,
    extraOptions: any,
    isLoadingNext: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    vehicleTypeSelected: {
        name: string,
        open: boolean,
        pricePerHour: number,
        vehicleTypeId: number,
    },
    showSlidingPanel: boolean,
    token: any,
}
class VehicleTypesGrid extends React.Component<MyProps, MyState> {
    map: any;
    slidingPanelVehicleType: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            // @ts-ignore
            vehicleTypeSelected: null,
            showSlidingPanel: false,
            token: null
        };
    }

    async componentDidMount() {
        const token = await getHeaderToken();
        this.setState({ token });
    }

    onNextScreen = (vehicleType, extraOptionsSelected) => {
        const { navigation, setOrderVehicleType, setOrderExtraOptions } = this.props;
        setOrderVehicleType(vehicleType);
        const extraOptions = this.getExtraOptionsId(extraOptionsSelected);
        setOrderExtraOptions(extraOptions);
        navigation.navigate('PaymentMethod');
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

    getVehicleTypeImage = (name) => {
        if (name == 'Chico') {
            return small;
        } else if (name == 'Mediano') {
            return regular;
        } else {
            return big;
        }
    }

    render() {
        const { token } = this.state;
        const { vehicleTypes, extraOptions, isLoadingNext } = this.props;
        if (!token) {
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
                    keyExtractor={item => item.vehicleTypeId}
                    itemDimension={130}
                    data={vehicleTypes}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            // key={item.vehicleTypeId}
                            onPress={() => { this.slidingPanelVehicleType(item) }}
                            style={styles.itemContainer}>
                            <Image 
                                style={styles.itemImage} 
                                resizeMode='cover'
                                defaultSource={require('../../../../../assets/default-car.png')}
                                source={{ uri: API_VEHICLE_TYPE_IMAGE(item.vehicleTypeId), headers: token }} />
                                {/* source={this.getVehicleTypeImage(item.name)} /> */}
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>$ {item.pricePerHour} por hora</Text>
                        </TouchableOpacity>
                    )}/>
                <SlidingPanelVehicleType 
                    isLoading={isLoadingNext}
                    forwardRef={c => { this.slidingPanelVehicleType = c }}
                    extraOptions={extraOptions}
                    token={token}
                    onNextScreen={this.onNextScreen}/>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        vehicleTypes: state.ordersReducer.orderInfo.vehicleTypes,
        extraOptions: state.ordersReducer.orderInfo.extraOptions,
        isLoadingNext: state.ordersReducer.isLoading,
    }
}

export default connect(mapStateToProps, { setOrderVehicleType, setOrderExtraOptions })(VehicleTypesGrid);
