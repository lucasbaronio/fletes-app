import Constants from 'expo-constants';
import { Button, Icon, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, TouchableOpacity, ActivityIndicator, Pressable, Linking
} from 'react-native';
import * as RootNavigation from '../../../config/routes/rootNavigation';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import * as Progress from 'react-native-progress';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';
import { extraOptionPriceTypes, getOrderStatusCurrentTime, getOrderStatusIndex, getOrderStatusText, statusOrder } from '../../../config/utils';
import { displayDate } from '../utils/utils';
import { HELP_PHONE } from '../../../config/constants';

type MyProps = {
  onPress: () => void,
  onPressComments: (edit) => void,
  setOrderRating: (rating, onSuccess) => void,
  order: any,
  textButton: string[],
  isLoading: boolean,
}
const SlidingPanelUserOrderDetails: React.FunctionComponent<MyProps> = ({ onPress, order, isLoading, textButton, setOrderRating, onPressComments }) => {
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
  const [pricePerHour, setPricePerHour] = useState(0);
  
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
    const { pricePerHour } = order;
    let extraOptionsDynamicTotalPrice = 0;
    order.extraOptions.forEach(item => {
      if (item.priceType == extraOptionPriceTypes.DYNAMIC) {
        extraOptionsDynamicTotalPrice += item.price
      }
    });
    setPricePerHour(extraOptionsDynamicTotalPrice + pricePerHour);
  });

  useEffect(() => {
		const slidingListener = panelPositionVal.addListener(
			_onAnimatedValueChange,
		);
		return () => panelPositionVal.removeListener(slidingListener);
	}, [panelPositionVal]);

  const onPressHelp = () => {
    Linking.openURL(`whatsapp://send?phone=${HELP_PHONE}`).then((data) => {
      console.log('Se pidió ayuda al celular de Whatsapp');
    }).catch((err) => {
      console.log(err);
      alert('No se puede abrir Whatsapp porque no se encontró instalado en el dispositivo');
    });
  }

  const onPressMoreDetails = () => {
    RootNavigation.push('OrderDetails', {
      order: order
    });
  }

  // const renderDate = () => {
  //   switch (order.status) {
  //     case statusOrder.PENDING:
  //       return {
  //         title: 'Hora programada del transportista en el punto de origen',
  //         value: displayDate(order.originAt),
  //       };
  //     case statusOrder.ACCEPTED:
  //       return {
  //         title: 'Hora programada del transportista en el punto de origen',
  //         value: displayDate(order.originAt),
  //       };
  //     case statusOrder.TO_ORIGIN:
  //       return {
  //         title: order.shipperArrivesAtOriginAt 
  //                   ? 'Hora estimada del transportista en el punto de origen'
  //                   : 'Hora programada del transportista en el punto de origen',
  //         value: order.shipperArrivesAtOriginAt 
  //                   ? displayDate(order.shipperArrivesAtOriginAt)
  //                   : displayDate(order.originAt),
  //       };
  //     case statusOrder.AT_ORIGIN:
  //       return {
  //         title: 'Hora que llegó el transportista al punto de origen',
  //         value: displayDate(order.shipperArrivedAtOriginAt),
  //       };
  //     case statusOrder.TO_DESTINATION:
  //       return {
  //         title: 'Hora estimada del transportista en el punto de destino',
  //         value: order.shipperArrivesAtDestinationAt 
  //                   ? displayDate(order.shipperArrivesAtDestinationAt)
  //                   : 'No se indicó hora estimada',
  //       };
  //     case statusOrder.AT_DESTINATION:
  //       return {
  //         title: 'Hora que llegó el transportista al punto de destino',
  //         value: displayDate(order.shipperArrivedAtDestinationAt),
  //       };
  //     case statusOrder.COMPLETE_PENDING:
  //       return {
  //         title: 'Hora que el transportista finalizó el pedido',
  //         value: displayDate(order.shipperCompletedAt),
  //       };
  //     case statusOrder.COMPLETED:
  //       return {
  //         title: 'Hora que se completó el pedido',
  //         value: displayDate(order.userCompletedAt),
  //       };
  //     case statusOrder.CANCELED:
  //       return {
  //         title: order.userCompletedAt
  //                   ? 'Hora que el usuario canceló el pedido'
  //                   : 'Hora que el transportista canceló el pedido',
  //         value: order.userCompletedAt
  //                   ? displayDate(order.userCompletedAt)
  //                   : displayDate(order.shipperCompletedAt),
  //       };
  //     default:
  //       return {
  //         title: '',
  //         value: '',
  //       };
  //   }
  // }

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
          <Pressable 
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
          </Pressable>

          <View style={styles.timeNextStatusContainer}>
            <View>
              <Text style={styles.timeNextStatusText}>
                {getOrderStatusCurrentTime(order).title}
              </Text>
            </View>
            <View>
              <Text style={styles.timeNextStatusValue}>
                {getOrderStatusCurrentTime(order).value}
              </Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.PENDING}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.PENDING) ? 1 : 0}
              height={4}
              color={color.primary.dark}
              unfilledColor={color.primary.light} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.ACCEPTED}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.ACCEPTED) ? 1 : 0}
              height={4}
              color={color.primary.dark}
              unfilledColor={color.primary.light} />
            <Progress.Bar 
              style={{ flex: 1, marginHorizontal: 2 }}
              indeterminate={order.status === statusOrder.TO_ORIGIN}
              progress={getOrderStatusIndex(order.status) > getOrderStatusIndex(statusOrder.TO_ORIGIN) ? 1 : 0}
              height={4}
              color={color.primary.dark}
              unfilledColor={color.primary.light} />
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
              color={color.primary.dark}
              unfilledColor={color.primary.light} />
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
              color={color.primary.dark}
              unfilledColor={color.primary.light} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{getOrderStatusText(order.status)}</Text>
          </View>
          <View style={styles.separator}></View>
          {
            order.status != statusOrder.PENDING && 
            order.status != statusOrder.COMPLETED && order.shipper.name &&
            <><View style={styles.shipperContainer}>
              <View>
                <Text style={styles.titleText}>
                  Nombre del transportista
                </Text>
              </View>
              <View>
                <Text style={styles.text1}>
                  {order.shipper.name}
                </Text>
              </View>
            </View>
            <View style={styles.separator}></View></>
          }
          <View style={styles.orderContainer}>
            <View style={styles.orderPriceContainer}>
              {
                ((order.status == statusOrder.COMPLETE_PENDING) || (order.status == statusOrder.COMPLETED)) && order.finalPrice
                ? 
                <View style={[styles.orderPriceLine, { marginVertical: 5 }]}>
                  <Text style={{ flex: 1, fontSize: fontSize.L }}>Total</Text>
                  <Text style={{ fontSize: fontSize.L, fontWeight: fontWeight.L }}>$ {order.finalPrice}</Text>
                </View>
                : 
                <><View style={styles.orderPriceLine}>
                    <Text style={styles.orderPriceText}>Precio por hora</Text>
                    <Text style={styles.orderPriceValue}>$ {pricePerHour}</Text>
                </View>
                <View style={styles.orderPriceLine}>
                    <Text style={styles.orderPriceText}>Total fijo</Text>
                    <Text style={styles.orderPriceValue}>$ {order.fixedPrice}</Text>
                </View></>
              }
            </View>
            <View style={styles.orderDetailsContainer}>
              <TouchableOpacity
                style={styles.orderDetailsButton}
                onPress={() => onPressMoreDetails()} >
                <Foundation 
                  name="clipboard-notes" 
                  size={iconSize.XXL} 
                  color={color.primary.dark} />
                <Text style={styles.orderDetailsText}>Detalle</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {
            ((order.status == statusOrder.TO_ORIGIN && order.shipperArrivesAtOriginAt) || 
            (order.status == statusOrder.TO_DESTINATION && order.shipperArrivesAtDestinationAt)) &&
            <><View style={styles.separator}></View>
            <View style={{ flexDirection: 'column', width: '90%', marginVertical: 1 }}>
                {
                  (order.status == statusOrder.TO_ORIGIN) ?
                    <View>
                      <Text style={styles.titleText}>Hora aprox. a punto de origen</Text>
                      {
                        order.shipperArrivesAtOriginAt &&
                        <Text style={styles.text1}>{displayDate(order.shipperArrivesAtOriginAt)}</Text>
                      }
                    </View>
                  :
                    <><Text style={styles.titleText}>Hora aprox. a punto de destino</Text>
                    {
                      order.shipperArrivesAtDestinationAt &&
                      <Text style={styles.text1}>{displayDate(order.shipperArrivesAtDestinationAt)}</Text>
                    }</>
                }
            </View></>
          } */}
          {
            ((order.status == statusOrder.COMPLETE_PENDING) || (order.status == statusOrder.COMPLETED)) &&
            <><View style={styles.separator}></View>
            <View style={{ flexDirection: 'column', width: '90%', marginVertical: 1 }}>
              <Text style={styles.titleText}>Califica al transportista</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <AntDesign 
                  onPress={() => 
                    (order.status == statusOrder.COMPLETE_PENDING) && setOrderRating(1,() => {})
                  } 
                  name={order.rating > 0 ? "star" : "staro" } 
                  size={iconSize.XXL} 
                  color="gold" />
                <AntDesign 
                  onPress={() => 
                    (order.status == statusOrder.COMPLETE_PENDING) && setOrderRating(2,() => {})
                  } 
                  name={order.rating > 1 ? "star" : "staro" } 
                  size={iconSize.XXL} 
                  color="gold" />
                <AntDesign 
                  onPress={() => 
                    (order.status == statusOrder.COMPLETE_PENDING) && setOrderRating(3,() => {})
                  } 
                  name={order.rating > 2 ? "star" : "staro" } 
                  size={iconSize.XXL} 
                  color="gold" />
                <AntDesign 
                  onPress={() => 
                    (order.status == statusOrder.COMPLETE_PENDING) && setOrderRating(4,() => {})
                  } 
                  name={order.rating > 3 ? "star" : "staro" } 
                  size={iconSize.XXL} 
                  color="gold" />
                <AntDesign 
                  onPress={() => 
                    (order.status == statusOrder.COMPLETE_PENDING) && setOrderRating(5,() => {})
                  } 
                  name={order.rating > 4 ? "star" : "staro" } 
                  size={iconSize.XXL} 
                  color="gold" />
              </View>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.orderSelectContainer}>
              <View style={styles.orderSelectTitleContainer}>
                <Text style={styles.titleText}>Comentarios finales</Text>
                {
                  order.comments && 
                  <Text style={styles.text3}>{order.comments.replace(/\n|\r/g, " ").substring(0,30)}...</Text>
                }
              </View>
              <View style={styles.orderSelectButtonContainer}>
                {
                  order.status == statusOrder.COMPLETE_PENDING 
                  ? <Pressable
                    style={styles.orderSelectButton}
                    onPress={() => onPressComments(true)} >
                    <Text style={[styles.buttonText, styles.text4]}>Cambiar</Text>
                  </Pressable>
                  :
                  <Pressable
                    style={styles.orderSelectButton}
                    onPress={() => onPressComments(false)} >
                    <Text style={[styles.buttonText, styles.text4]}>Ver mas</Text>
                  </Pressable>
                }
              </View>
              
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
                  <Pressable 
                    key={index}
                    style={[styles.rowContainer, styles.button]}
                    onPress={onPress}>
                      {
                        isLoading ?
                          <ActivityIndicator />
                        :
                        <Text style={styles.textButton}>
                          {text}
                        </Text>
                      }
                  </Pressable>
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
  titleText: {
    fontSize: fontSize.XS,
    color: color.grey.slateGrey
  },
  text1: {
    fontSize: fontSize.L,
    fontWeight: fontWeight.L
  },
  text2: {
    fontSize: fontSize.M, 
    fontWeight: fontWeight.M
  },
  text3: {
    fontSize: fontSize.S, 
  },
  text4: {
    fontSize: fontSize.XS,
  },
  buttonText: {
    color: color.white.white,
    fontWeight: fontWeight.L,
    textAlign: "center"
  },
  dragButton: { 
    width: '100%', 
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
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
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: color.primary.light,
  },
  separatorMiddle: {
    width: '95%',
    height: 5, 
    marginVertical: 2, 
    borderBottomWidth: 1, 
    borderBottomColor: color.primary.light,
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
  orderSelectContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20,
    marginVertical: 1,
  },
  orderSelectTitleContainer: {
    flex: .7, 
    flexDirection: 'column'
  },
  orderSelectButtonContainer: {
    flex: .3, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderSelectButton: { 
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: color.primary.dark, 
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
  rowContainer: {
    flex: 1, 
    justifyContent: "center", 
    flexDirection: 'row',
    marginVertical: 3
  },
  button: {
      paddingVertical: 10, 
      backgroundColor: color.primary.dark,
      borderRadius: 10,
  },
  textButton: {
    color: color.white.white, 
    fontSize: fontSize.L, 
    fontWeight: fontWeight.L, 
    textAlign: 'center'
  },
});

export default SlidingPanelUserOrderDetails;