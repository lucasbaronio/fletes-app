import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { actions as userOrders } from "../../index";
const { changeOrderStatusCanceled, changeOrderStatusCompleted } = userOrders;

import styles from './styles';
import { color } from '../../../../styles/theme';
import { API_KEY_GOOGLE } from '../../../../config/constants';
import { getOrderStatusSuccessText, getOrderStatusTextButtonUser, statusOrder } from '../../../../config/utils';
import SlidingPanelUserOrderDetails from '../../components/SlidingPanelUserOrderDetails';
import CustomModal from '../../../../components/CustomModal';

type MyProps = {
    changeOrderStatusCompleted: (orderStatusCompleted, onSuccess, onError) => void,
    changeOrderStatusCanceled: (orderId, onSuccess, onError) => void,
    order: any,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
}
class MapUserOrderDetails extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
        };
    }

    componentDidMount() {

    }

    onPress = () => {
        const { order, changeOrderStatusCompleted, changeOrderStatusCanceled } = this.props;
        switch (order.status) {
            case statusOrder.PENDING:
                changeOrderStatusCanceled(order.orderId, this.onSuccess, this.onError);
                break;
            case statusOrder.ACCEPTED:
                changeOrderStatusCanceled(order.orderId, this.onSuccess, this.onError);
                break;
            case statusOrder.COMPLETE_PENDING:
                changeOrderStatusCompleted({
                    orderId: order.orderId,
                    rating: 5,
                    comments: 'Muy buenooo!!!',
                }, this.onSuccess, this.onError);
                break;
            default:
                return;
        }
    }

    onSuccess = (status) => {
        this.setState({
            error: getOrderStatusSuccessText(status), 
            visibleModal: true,
        });
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
    }

    getMidPointCoords = (coordsA, coordsB) => {
        let midRegion = {
            latitude: (coordsA.latitude + coordsB.latitude) / 2,
            longitude: (coordsA.longitude + coordsB.longitude) / 2,
            latitudeDelta: 0,
            longitudeDelta: 0
        };
        return {
            ...midRegion,
            latitudeDelta: Math.abs(coordsA.latitude - midRegion.latitude) * 5,
            longitudeDelta: Math.abs(coordsA.longitude - midRegion.longitude) * 3,
        }
    }

    initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
    }

    render() {
        const { error, visibleModal } = this.state;
        const { order, isLoading } = this.props;
        const { originAddress, destinationAddress, status } = order;
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                {/* <StatusBar style="dark" /> */}
                {/* <View style={styles.floatText}>
                    <Text style={{ textAlign: 'center' }}>
                        {ORDERS_SCENES_MAP_ADDRESS_TITLE}
                    </Text>
                </View>
                <View style={styles.mylocation}>
                    <MaterialIcons 
                        name='my-location'
                        color={color.black.black}
                        size={iconSize.XL}
                        onPress={() => { this.centrateMap() }} />
                </View> */}
                <MapView 
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    showsScale={false}
                    showsBuildings={false}
                    showsIndoors={false}
                    // zoomEnabled={false}
                    // zoomTapEnabled={false}
                    // zoomControlEnabled={false}
                    rotateEnabled={false}
                    // scrollEnabled={false}
                    pitchEnabled={false}
                    toolbarEnabled={false}
                    initialRegion={!isLoading ? this.getMidPointCoords(originAddress.coords, destinationAddress.coords) : this.initialRegion}
                    style={styles.mapStyle} >

                    {
                        // originAddress.coords && destinationAddress.coords &&
                        !isLoading &&
                        <><Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            pinColor={color.red.redTomato}
                            coordinate={originAddress.coords} >
                        </Marker>
                        <Marker 
                            draggable
                            // image={require('../../../../../assets/driver.png')}
                            pinColor={color.blue.steelBlue}
                            coordinate={destinationAddress.coords} >
                        </Marker>
                        <MapViewDirections
                            origin={originAddress.coords}
                            destination={destinationAddress.coords}
                            apikey={API_KEY_GOOGLE}
                            strokeWidth={3}
                            strokeColor={color.green.greenLima} /></>
                    }
                    
                </MapView>
                <SlidingPanelUserOrderDetails 
                    isLoading={isLoading}
                    order={order}
                    textButton={getOrderStatusTextButtonUser(status)}
                    onPress={this.onPress} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.userOrdersReducer.isLoading,
        order: state.userOrdersReducer.orderSelected,
    }
}

export default connect(mapStateToProps, { changeOrderStatusCompleted, changeOrderStatusCanceled })(MapUserOrderDetails);
