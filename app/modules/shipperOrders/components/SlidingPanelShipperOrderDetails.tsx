import Constants from 'expo-constants';
import { Button, Icon, Text } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Animated, StyleSheet,
  View, TouchableOpacity, ActivityIndicator, Pressable, Linking
} from 'react-native';
import * as RootNavigation from '../../../config/routes/rootNavigation';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SlidingUpPanel, { SlidingUpPanelAnimationConfig } from 'rn-sliding-up-panel';
import * as Progress from 'react-native-progress';
import { color, fontSize, fontWeight, iconSize, isiOS, screenSize } from '../../../styles/theme';
import { currentDate, currentDateMoment, dateToBackend, displayDate } from '../../orders/utils/utils';
import { extraOptionPriceTypes, getOrderStatusCurrentTime, getOrderStatusIndex, getOrderStatusText, statusOrder } from '../../../config/utils';
import PickerModal from '../../shared/PickerModal/PickerModal';

type MyProps = {
  onPress: (index) => void,
  onPressComments: (edit) => void,
  order: any,
  textButton: string[],
  vehicleSelected: any,
  onSetArrivesAtOrigin: any,
  onSetArrivesAtDestination: any,
  isLoading: boolean,
}
const SlidingPanelShipperOrderDetails: React.FunctionComponent<MyProps> = ({ onPress, onPressComments, order, isLoading, textButton, vehicleSelected, onSetArrivesAtOrigin, onSetArrivesAtDestination }) => {
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
  const [visible, setVisible] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);

  const PANEL_VELOCITY = isiOS ? 2 : 2.3;
  const hideFullScreenPanelOptions: SlidingUpPanelAnimationConfig = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom
  };

  const _onAnimatedValueChange = ({ value }) => {
    // const {top, bottom} = draggableRange;
    // const delta = top - bottom;
    // const valuePCT = ((value - bottom) * 100) / delta;
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
    Linking.openURL('whatsapp://send?phone=59893764373').then((data) => {
      console.log('WhatsApp abierto');
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

  const onPressSelectVehicle = () => {
    console.log('vehicleTypeId', order.vehicleType.vehicleTypeId);
    RootNavigation.push('VehicleSelect', { vehicleTypeId: order.vehicleType.vehicleTypeId });
  }

  const onPressSelectOriginTime = () => {
    setVisible(true);
  }

  const hideDatePicker = () => {
    setVisible(false);
  };

  const handleConfirm = (hours, minutes) => {
    setHours(hours);
    setMinutes(minutes);
    const date = currentDateMoment().add(hours, 'hours').add(minutes, 'minutes');
    if (order.status == statusOrder.ACCEPTED) {
      onSetArrivesAtOrigin(dateToBackend(date), () => {});
    } else {
      onSetArrivesAtDestination(dateToBackend(date), () => {});
    }
    hideDatePicker();
  };

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
          <View style={[styles.containerSliding, styles.containerColumn]}>
            <View>
              <Text style={[styles.marginVerticalLines, styles.titleText]}>
                {getOrderStatusCurrentTime(order).title}
              </Text>
            </View>
            <View>
              <Text style={styles.text2}>
                {getOrderStatusCurrentTime(order).value}
                </Text>
            </View>
          </View>
          <View style={[styles.containerRow, styles.marginVerticalLines, { alignItems: 'center', marginVertical: 15 }]}>
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
          <View style={[styles.containerSliding, styles.marginVerticalLines]}>
            <Text style={styles.text2}>{getOrderStatusText(order.status)}</Text>
          </View>
          <View style={[styles.separator, styles.separatorLong]}></View>
          {
            order.user.name && order.status != statusOrder.COMPLETED &&
            <><View style={[styles.containerSliding, styles.containerColumn]}>
              <View>
                <Text style={styles.titleText}>
                  Nombre del usuario
                </Text>
              </View>
              <View>
                <Text style={styles.text1}>
                  {order.user.name}
                </Text>
              </View>
            </View>
            <View style={[styles.separator, styles.separatorLong]}></View></>
          }
          <View style={[styles.containerSliding, styles.containerRow]}>
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
                    <Text style={[{ flex: 1 }, styles.text3]}>Precio por hora</Text>
                    <Text style={styles.text2}>$ {pricePerHour}</Text>
                </View>
                <View style={styles.orderPriceLine}>
                    <Text style={[{ flex: 1 }, styles.text3]}>Total fijo</Text>
                    <Text style={styles.text2}>$ {order.fixedPrice}</Text>
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
                <Text style={[styles.orderDetailsText, styles.text4]}>Detalle</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            order.status == statusOrder.PENDING &&
            <><View style={[styles.separator, styles.separatorLong]}></View>
            <View style={styles.orderSelectContainer}>
              <View style={styles.orderSelectTitleContainer}>
                <Text style={styles.text3}>Vehiculo seleccionado</Text>
                {
                  vehicleSelected && vehicleSelected.vehicleId != 0 &&
                  <Text style={styles.text2}>{vehicleSelected.model} - {vehicleSelected.registration}</Text>
                }
              </View>
              <View style={styles.orderSelectButtonContainer}>
                <Pressable
                  style={styles.orderSelectButton}
                  onPress={onPressSelectVehicle} >
                  <Text style={[styles.buttonText, styles.text4]}>Seleccionar</Text>
                </Pressable>
              </View>
            </View></>
          }
          {
            (order.status == statusOrder.ACCEPTED || order.status == statusOrder.AT_ORIGIN) &&
            <><View style={[styles.separator, styles.separatorLong]}></View>
            <View style={styles.orderSelectContainer}>
              <View style={styles.orderSelectTitleContainer}>
                {
                  (order.status == statusOrder.ACCEPTED) ?
                    <><Text style={styles.text4}>Tiempo aprox. a punto de origen</Text>
                    {
                      order.shipperArrivesAtOriginAt &&
                      <Text style={styles.text2}>{hours} hs y {minutes} mins.</Text>
                    }</>
                  :
                    <><Text style={styles.text4}>Tiempo aprox. a punto de destino</Text>
                    {
                      order.shipperArrivesAtDestinationAt &&
                      <Text style={styles.text2}>{hours} hs y {minutes} mins.</Text>
                    }</>
                }
              </View>
              <View style={styles.orderSelectButtonContainer}>
                <Pressable
                  style={styles.orderSelectButton}
                  onPress={onPressSelectOriginTime} >
                  <Text style={[styles.buttonText, styles.text4]}>Seleccionar</Text>
                </Pressable>
              </View>
              <PickerModal 
                hours={hours} 
                minutes={minutes} 
                titleModal={(order.status == statusOrder.ACCEPTED) ? "Tiempo de llegada estimado a punto de origen" : "Tiempo de llegada estimado a punto de destino"} 
                visible={visible} 
                onConfirm={handleConfirm}/>
            </View></>
          }
          {
            order.status == statusOrder.COMPLETED && order.rating && 
            <><View style={[styles.separator, styles.separatorLong]}></View>
            <View style={[styles.containerSliding, styles.containerColumn]}>
              <Text style={styles.titleText}>
                Calificación del usuario
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <AntDesign name={order.rating > 0 ? "star" : "staro" } size={iconSize.XXL} color="gold" />
                <AntDesign name={order.rating > 1 ? "star" : "staro" } size={iconSize.XXL} color="gold" />
                <AntDesign name={order.rating > 2 ? "star" : "staro" } size={iconSize.XXL} color="gold" />
                <AntDesign name={order.rating > 3 ? "star" : "staro" } size={iconSize.XXL} color="gold" />
                <AntDesign name={order.rating > 4 ? "star" : "staro" } size={iconSize.XXL} color="gold" />
              </View>
            </View>
            <View style={[styles.separator, styles.separatorLong]}></View>
            <View style={styles.orderSelectContainer}>
              <View style={styles.orderSelectTitleContainer}>
                <Text style={styles.titleText}>Comentarios finales</Text>
                {
                  order.comments && 
                  <Text style={styles.text3}>{order.comments.replace(/\n|\r/g, " ").substring(0,30)}...</Text>
                }
              </View>
              <View style={styles.orderSelectButtonContainer}>
                  <Pressable
                    style={styles.orderSelectButton}
                    onPress={() => onPressComments(false)} >
                    <Text style={[styles.buttonText, styles.text4]}>Ver mas</Text>
                  </Pressable>
              </View>
              
            </View></>
          }
          <View style={[styles.separator, styles.separatorLong]}></View>
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
                    onPress={() => onPress(index)}>
                      {
                        isLoading ?
                          <ActivityIndicator />
                        :
                        <Text style={styles.buttonTextBottom}>
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
  dragButton: { 
    width: '100%', 
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
  },
  containerSliding: {
    width: '90%', 
  },
  containerColumn: {
    flexDirection: 'column',
  },
  containerRow: {
    width: '90%', 
    flexDirection: 'row',
  },
  titleText: {
    fontSize: fontSize.XS,
    color: color.grey.slateGrey
  },
  marginVerticalLines: {
    marginVertical: 5,
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
  separator: {
    height: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: color.primary.light,
  },
  separatorMiddle: {
    width: '95%',
    marginVertical: 2, 
  },
  separatorLong: {
    width: '90%',
    marginVertical: 15, 
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
    flexDirection: 'column',
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
  buttonTextBottom: {
    color: color.white.white, 
    fontSize: fontSize.L, 
    fontWeight: fontWeight.L, 
    textAlign: 'center'
  },
});

export default SlidingPanelShipperOrderDetails;