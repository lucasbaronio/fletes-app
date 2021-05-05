import Constants from 'expo-constants';
import { Button, Icon, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, TouchableOpacity, ActivityIndicator
} from 'react-native';
import * as RootNavigation from '../../../config/routes/rootNavigation';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import * as Progress from 'react-native-progress';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';
import { getOrderStatusIndex, getOrderStatusText, statusOrder } from '../../../config/utils';
import { displayDate } from '../utils/utils';

type MyProps = {
  onPress: () => void,
  order: any,
  textButton: string[],
  isLoading: boolean,
}
const SlidingPanelUserOrderDetails: React.FunctionComponent<MyProps> = ({ onPress, order, isLoading, textButton }) => {
  const deviceHeight = screenSize.height;
  const deviceWidth = screenSize.width;

  const draggableRange = {
    top: (deviceHeight - Constants.statusBarHeight) * 0.9,
    bottom: (deviceHeight - Constants.statusBarHeight) * 0.5,
  };

  const snappingPoints = [
    draggableRange.top,
    draggableRange.bottom
  ];

  const panelRef = useRef<SlidingUpPanel | null>(null);
  const [panelPositionVal, setPanelPositionVal] = useState(new Animated.Value(draggableRange.bottom));
  
  const PANEL_VELOCITY = isiOS ? 2 : 2.3;
  const hideFullScreenPanelOptions: SlidingUpPanelAnimationConfig = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom
  };

  const _onAnimatedValueChange = ({ value }) => {
    const {top, bottom} = draggableRange;
    const delta = top - bottom;
    const valuePCT = ((value - bottom) * 100) / delta;

    // if (value === top) {
    //   setAtTop(true);
    // }
    // if (value === bottom) {
    //   setAtTop(false);
    // }
  }

  useEffect(() => {
		const slidingListener = panelPositionVal.addListener(
			_onAnimatedValueChange,
		);
		return () => panelPositionVal.removeListener(slidingListener);
	}, [panelPositionVal]);

  const onPressHelp = () => {

  }

  const onPressMoreDetails = () => {
    RootNavigation.push('OrderDetails', {
      order: order
    });
  }

  return (
    <SlidingUpPanel
        // @ts-ignore
        ref={panelRef}
        animatedValue={panelPositionVal}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        showBackdrop={true}
        height={deviceHeight}
        allowDragging={true}
        minimumDistanceThreshold={deviceHeight > 800 ? 50 : 30}
        // onMomentumDragEnd={onMomentumDragEnd}
        // onDragStart={onDragStart}
        containerStyle={styles.slidingUpPanel}
    >
        <View style={styles.panelContent}>
          <Button 
            transparent
            style={styles.dragButton}
            onPress={() => {
              // @ts-ignore
              panelRef.current.show(hideFullScreenPanelOptions);
            }}>
              <View style={{
                  borderWidth: 3,
                  width: screenSize.width * 0.15, 
                  borderRadius: 3,
                  borderColor: color.grey.lightGrey
                }}>
              </View>
          </Button>

          <View style={styles.timeNextStatusContainer}>
            <View>
              <Text style={styles.timeNextStatusText}>
                Fecha y hora de llegada del transportista al punto de origen
                </Text>
            </View>
            <View>
              <Text style={styles.timeNextStatusValue}>
                {displayDate(order.originAt)}
                </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.PENDING}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.PENDING) ? 1 : 0}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.ACCEPTED}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.ACCEPTED) ? 1 : 0}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.TO_ORIGIN}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.TO_ORIGIN) ? 1 : 0}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Icon 
              name="pin"
              style={{
                  fontSize: iconSize.XL, 
                  color: getOrderStatusIndex(order.status) >= getOrderStatusIndex(statusOrder.AT_ORIGIN)
                            ? color.red.redTomato 
                            : color.red.disable
              }} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.TO_DESTINATION}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.TO_DESTINATION) ? 1 : 0}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
            <Icon 
              name="pin"
              style={{
                  fontSize: iconSize.XL, 
                  color: getOrderStatusIndex(order.status) >= getOrderStatusIndex(statusOrder.AT_DESTINATION)
                            ? color.blue.steelBlue 
                            : color.blue.disable
              }} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.AT_DESTINATION}
              progress={getOrderStatusIndex(order.status) == getOrderStatusIndex(statusOrder.COMPLETED) ? 1 : 0}
              height={4}
              color={color.blue.steelBlue}
              unfilledColor={color.blue.lightBlue} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getOrderStatusText(order.status)}</Text>
          </View>
          <View style={styles.separator}></View>
          {
            !!order.shipper && order.status != statusOrder.PENDING &&
            <><View style={styles.shipperContainer}>
              <View>
                <Text style={styles.shipperText}>
                  Nombre del transportista
                </Text>
              </View>
              <View>
                <Text style={styles.shipperValue}>
                  {order.shipper.name}
                </Text>
              </View>
            </View>
            <View style={styles.separator}></View></>
          }
          <View style={styles.orderContainer}>
            <View style={styles.orderPriceContainer}>
              <View style={styles.orderPriceLine}>
                  <Text style={styles.orderPriceText}>Precio por hora</Text>
                  <Text style={styles.orderPriceValue}>$ {order.pricePerHour}</Text>
              </View>
              {/* <View style={styles.separatorMiddle}></View> */}
              <View style={styles.orderPriceLine}>
                  <Text style={styles.orderPriceText}>Total fijo</Text>
                  <Text style={styles.orderPriceValue}>$ {order.fixedPrice}</Text>
              </View>
            </View>
            <View style={styles.orderDetailsContainer}>
              <TouchableOpacity
                style={styles.orderDetailsButton}
                onPress={() => onPressMoreDetails()} >
                <Foundation 
                  name="clipboard-notes" 
                  size={iconSize.XXL} 
                  color={color.black.black} />
                <Text style={styles.orderDetailsText}>Detalle</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            order.finalPrice &&
            <><View style={styles.separator}></View>
            <View style={[styles.orderPriceLine, { marginHorizontal: 20 }]}>
                <Text style={{ flex: 1, fontSize: fontSize.L }}>Total</Text>
                <Text style={{ fontSize: fontSize.L, fontWeight: fontWeight.L }}>$ {order.finalPrice}</Text>
            </View></>
          }
          <View style={styles.separator}></View>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => onPressHelp()}
            >
              <MaterialCommunityIcons name="headset" size={iconSize.M} color={color.black.black} />
              <Text style={styles.textHelpButton}>Necesitás ayuda?</Text>
            </TouchableOpacity>
          </View>

          {
            textButton.length > 0 &&
            <View style={[styles.containerButton, { 
              bottom: (deviceHeight - draggableRange.top) + 20,
              left: (deviceWidth * 0.1) / 2
            }]}>
              {
                textButton.map((text, index) => (
                  <Button 
                    key={index}
                    style={styles.button}
                    onPress={onPress}>
                      {
                        isLoading ?
                          <ActivityIndicator />
                        :
                        <Text style={styles.textButton}>
                          {text}
                        </Text>
                      }
                  </Button>
                ))
              }
            </View>
          }
        </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  panelContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: color.white.whitesmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  slidingUpPanel: {
    zIndex: 10, 
    elevation: 10, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30
  },
  dragButton: { 
    width: '100%', 
    justifyContent: "center",
  },
  timeNextStatusContainer:{
    width: '90%', 
    flexDirection: 'column',
  },
  timeNextStatusText: {
    marginVertical: 5,
    fontSize: fontSize.XS,
    color: color.grey.slateGrey
  },
  timeNextStatusValue: {
    fontSize: fontSize.L,
    fontWeight: fontWeight.L
  },
  progressBarContainer: {
    width: '90%', 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  statusContainer: {
    width: '90%',
    marginVertical: 5,
  },
  statusText: {
    fontSize: fontSize.M, 
    fontWeight: fontWeight.M
  },
  separator: {
    width: '90%',
    height: 5, 
    marginVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: color.grey.lightGrey,
  },
  separatorMiddle: {
    width: '95%',
    height: 5, 
    marginVertical: 2, 
    borderBottomWidth: 1, 
    borderBottomColor: color.grey.lightGrey,
  },
  shipperContainer: {
    width: '90%', 
  },
  shipperText: {
    // marginVertical: 2,
    fontSize: fontSize.XS,
    color: color.grey.slateGrey
  },
  shipperValue: {
    fontSize: fontSize.L,
    fontWeight: fontWeight.L
  },
  orderContainer: {
    width: '90%', 
    flexDirection: 'row',
  },
  orderPriceContainer: {
    flex: .8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  orderPriceLine: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 10,
    marginVertical: 1,
  },
  orderPriceText: { 
    flex: 1,
    fontSize: fontSize.S
  },
  orderPriceValue: { 
    fontSize: fontSize.M,
    fontWeight: fontWeight.L,
  },
  orderDetailsContainer: {
    flex: .2,
    borderLeftWidth: 1,
    borderLeftColor: color.grey.lightGrey,
  },
  orderDetailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderDetailsText: {
    marginTop: 3,
    textAlign: 'center',
    fontSize: fontSize.XS,
    fontWeight: fontWeight.M
  },
  helpContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 6,
    borderColor: color.grey.lightGrey,
    backgroundColor: color.grey.lightGrey,
  },
  textHelpButton: {
    color: color.black.black, 
    fontSize: fontSize.XS, 
    fontWeight: fontWeight.L, 
    marginLeft: 3
  },
  containerButton: {
    zIndex: 9,
    elevation: 7,
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
  },
  button: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: "center",
    marginHorizontal: 5,
  },
  textButton: {
    color: color.white.white, 
    fontSize: fontSize.XL, 
    fontWeight: fontWeight.L, 
    textAlign: 'center'
  },
});

export default SlidingPanelUserOrderDetails;